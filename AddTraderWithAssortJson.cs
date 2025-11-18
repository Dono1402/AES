using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Helpers;
using SPTarkov.Server.Core.Models.Eft.Common.Tables;
using SPTarkov.Server.Core.Models.Spt.Config;
using SPTarkov.Server.Core.Models.Spt.Mod;
using SPTarkov.Server.Core.Routers;
using SPTarkov.Server.Core.Servers;
using SPTarkov.Server.Core.Utils;
using System.Reflection;
using Path = System.IO.Path;

namespace AES_Trader;

// This record holds the various properties for your mod
public record ModMetadata : AbstractModMetadata
{
    public override string ModGuid { get; init; } = "com.dono.aes";
    public override string Name { get; init; } = "AES";
    public override string Author { get; init; } = "Flowless";
    public override List<string>? Contributors { get; init; } = ["Colobos9mm"];
    public override SemanticVersioning.Version Version { get; init; } = new("0.7.1");
    public override SemanticVersioning.Range SptVersion { get; init; } = new("~4.0.0");
    public override List<string>? Incompatibilities { get; init; } = ["ReadJsonConfigExample"];
    public override Dictionary<string, SemanticVersioning.Range>? ModDependencies { get; init; }
    public override string? Url { get; init; } = "https://github.com/sp-tarkov/server-mod-examples";
    public override bool? IsBundleMod { get; init; } = false;
    public override string? License { get; init; } = "MIT";
}

/// <summary>
/// Feel free to use this as a base for your mod
/// </summary>
[Injectable(TypePriority = OnLoadOrder.PostDBModLoader + 1)]
public class AddTraderWithAssortJson(
    ModHelper modHelper,
    ImageRouter imageRouter,
    ConfigServer configServer,
    TimeUtil timeUtil,
    WTTServerCommonLib.WTTServerCommonLib wttCommon,
    AddCustomTraderHelper AddCustomTraderHelper // This is a custom class we add for this mod, we made it injectable so it can be accessed like other classes here
)
    : IOnLoad
{
    private readonly TraderConfig _traderConfig = configServer.GetConfig<TraderConfig>();
    private readonly RagfairConfig _ragfairConfig = configServer.GetConfig<RagfairConfig>();


    public Task OnLoad()
    {
        // A path to the mods files we use below
        var pathToMod = modHelper.GetAbsolutePathToModFolder(Assembly.GetExecutingAssembly());

        // A relative path to the trader icon to show
        var traderImagePathAna = Path.Combine(pathToMod, "db/Anastasia.jpg");
        var traderImagePathEve = Path.Combine(pathToMod, "db/Evelyn.jpg");
        var traderImagePathSve = Path.Combine(pathToMod, "db/Svetlana.jpg");
        
        // The base json containing trader settings we will add to the server
        var traderBaseAna = modHelper.GetJsonDataFromFile<TraderBase>(pathToMod, "db/anastasiaBase.json");
        var traderBaseEve = modHelper.GetJsonDataFromFile<TraderBase>(pathToMod, "db/evelynBase.json");
        var traderBaseSve = modHelper.GetJsonDataFromFile<TraderBase>(pathToMod, "db/svetlanaBase.json");
        
        // Create a helper class and use it to register our traders image/icon + set its stock refresh time
        imageRouter.AddRoute(traderBaseAna.Avatar.Replace(".jpg", ""), traderImagePathAna);
        AddCustomTraderHelper.SetTraderUpdateTime(_traderConfig, traderBaseAna, timeUtil.GetHoursAsSeconds(1), timeUtil.GetHoursAsSeconds(2));
        imageRouter.AddRoute(traderBaseEve.Avatar.Replace(".jpg", ""), traderImagePathEve);
        AddCustomTraderHelper.SetTraderUpdateTime(_traderConfig, traderBaseEve, timeUtil.GetHoursAsSeconds(1), timeUtil.GetHoursAsSeconds(2));
        imageRouter.AddRoute(traderBaseSve.Avatar.Replace(".jpg", ""), traderImagePathSve);
        AddCustomTraderHelper.SetTraderUpdateTime(_traderConfig, traderBaseSve, timeUtil.GetHoursAsSeconds(1), timeUtil.GetHoursAsSeconds(2));
        
        // Add our trader to the config file, this lets it be seen by the flea market
        _ragfairConfig.Traders.TryAdd(traderBaseAna.Id, true);
        _ragfairConfig.Traders.TryAdd(traderBaseEve.Id, true);
        _ragfairConfig.Traders.TryAdd(traderBaseSve.Id, true);
        
        // Add our trader (with no items yet) to the server database
        // An 'assort' is the term used to describe the offers a trader sells, it has 3 parts to an assort
        // 1: The item
        // 2: The barter scheme, cost of the item (money or barter)
        // 3: The Loyalty level, what rep level is required to buy the item from trader
        AddCustomTraderHelper.AddTraderWithEmptyAssortToDb(traderBaseAna);
        AddCustomTraderHelper.AddTraderWithEmptyAssortToDb(traderBaseEve);
        AddCustomTraderHelper.AddTraderWithEmptyAssortToDb(traderBaseSve);
        
        // Add localisation text for our trader to the database so it shows to people playing in different languages
        AddCustomTraderHelper.AddTraderToLocales(traderBaseAna, "Anastasia", "A Russian girl that provides the best weapons accessories in Tarkov. She don't care if you're BEAR or USEC.");
        AddCustomTraderHelper.AddTraderToLocales(traderBaseEve, "Evelyn", "A trained American soldier who leads a small USEC group and seeks to join the High Command at the Military Base.");
        AddCustomTraderHelper.AddTraderToLocales(traderBaseSve, "Svetlana", "A trained Bear that supervises the entrances and exits of one of the hundreds of Bear centers in Tarkov.");
        
        // Get the assort data from JSON
        var assortAna = modHelper.GetJsonDataFromFile<TraderAssort>(pathToMod, "db/anastasiaAssort.json");
        var assortEve = modHelper.GetJsonDataFromFile<TraderAssort>(pathToMod, "db/evelynAssort.json");
        var assortSve = modHelper.GetJsonDataFromFile<TraderAssort>(pathToMod, "db/svetlanaAssort.json");
        
        // Save the data we loaded above into the trader we've made
        AddCustomTraderHelper.OverwriteTraderAssort(traderBaseAna.Id, assortAna);
        AddCustomTraderHelper.OverwriteTraderAssort(traderBaseEve.Id, assortEve);
        AddCustomTraderHelper.OverwriteTraderAssort(traderBaseSve.Id, assortSve);
        
        Assembly assembly = Assembly.GetExecutingAssembly();
        
        // Use WTT-CommonLib services
        wttCommon.CustomQuestService.CreateCustomQuests(assembly);        
        
        // Send back a success to the server to say our trader is good to go
        return Task.CompletedTask;
    }
}