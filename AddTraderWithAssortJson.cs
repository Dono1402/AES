using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Helpers.Server;
using SPTarkov.Server.Core.Models.Eft.Common.Tables;
using SPTarkov.Server.Core.Models.Spt.Config;
using SPTarkov.Server.Core.Models.Spt.Mod;
using SPTarkov.Server.Core.Routers;
using SPTarkov.Server.Core.Utils;
using System.Reflection;
using Path = System.IO.Path;
using Range = SemanticVersioning.Range;
using Version = SemanticVersioning.Version;

namespace AES_Trader;

public record ModMetadata : IModMetadata
{
    public string ModGuid { get; init; } = "com.dono.aes";
    public string Name { get; init; } = "AES";
    public string Author { get; init; } = "Flowless";
    public List<string>? Contributors { get; init; } = ["Colobos9mm"];
    public Version Version { get; init; } = new("0.8.0");
    public Range SptVersion { get; init; } = new("~4.1.0");
    public bool HasPrepatcher { get; init; } = false;
    public List<string>? Incompatibilities { get; init; }
    public Dictionary<string, Range>? ModDependencies { get; init; } = new()
    {
        { "com.wtt.commonlib", new Range("~3.0.0") }
    };
    public string? Url { get; init; } = "https://github.com/Dono1402/AES";
    public string License { get; init; } = "MIT";
}

[Injectable(TypePriority = OnLoadOrder.TraderRegistration + 1)]
public class AddTraderWithAssortJson(
    ModHelper modHelper,
    ImageRouter imageRouter,
    TraderConfig traderConfig,
    RagfairConfig ragfairConfig,
    TimeUtil timeUtil,
    WTTServerCommonLib.WTTServerCommonLib wttCommon,
    AddCustomTraderHelper addCustomTraderHelper
)
    : IOnLoad
{
    public async Task OnLoadAsync(CancellationToken cancellationToken)
    {
        var pathToMod = modHelper.GetAbsolutePathToModFolder(Assembly.GetExecutingAssembly());

        var traderImagePathAna = Path.Combine(pathToMod, "db/Anastasia.jpg");
        var traderImagePathEve = Path.Combine(pathToMod, "db/Evelyn.jpg");
        var traderImagePathSve = Path.Combine(pathToMod, "db/Svetlana.jpg");

        var traderBaseAna = modHelper.GetJsonDataFromFile<TraderBase>(pathToMod, "db/anastasiaBase.json");
        var traderBaseEve = modHelper.GetJsonDataFromFile<TraderBase>(pathToMod, "db/evelynBase.json");
        var traderBaseSve = modHelper.GetJsonDataFromFile<TraderBase>(pathToMod, "db/svetlanaBase.json");

        imageRouter.AddRoute(traderBaseAna.Avatar.Replace(".jpg", ""), traderImagePathAna);
        addCustomTraderHelper.SetTraderUpdateTime(traderConfig, traderBaseAna, timeUtil.GetHoursAsSeconds(1), timeUtil.GetHoursAsSeconds(2));
        imageRouter.AddRoute(traderBaseEve.Avatar.Replace(".jpg", ""), traderImagePathEve);
        addCustomTraderHelper.SetTraderUpdateTime(traderConfig, traderBaseEve, timeUtil.GetHoursAsSeconds(1), timeUtil.GetHoursAsSeconds(2));
        imageRouter.AddRoute(traderBaseSve.Avatar.Replace(".jpg", ""), traderImagePathSve);
        addCustomTraderHelper.SetTraderUpdateTime(traderConfig, traderBaseSve, timeUtil.GetHoursAsSeconds(1), timeUtil.GetHoursAsSeconds(2));

        ragfairConfig.Traders.TryAdd(traderBaseAna.Id, true);
        ragfairConfig.Traders.TryAdd(traderBaseEve.Id, true);
        ragfairConfig.Traders.TryAdd(traderBaseSve.Id, true);

        addCustomTraderHelper.AddTraderWithEmptyAssortToDb(traderBaseAna);
        addCustomTraderHelper.AddTraderWithEmptyAssortToDb(traderBaseEve);
        addCustomTraderHelper.AddTraderWithEmptyAssortToDb(traderBaseSve);

        addCustomTraderHelper.AddTraderToLocales(traderBaseAna, "Anastasia", "A Russian girl that provides the best weapons accessories in Tarkov. She don't care if you're BEAR or USEC.");
        addCustomTraderHelper.AddTraderToLocales(traderBaseEve, "Evelyn", "A trained American soldier who leads a small USEC group and seeks to join the High Command at the Military Base.");
        addCustomTraderHelper.AddTraderToLocales(traderBaseSve, "Svetlana", "A trained Bear that supervises the entrances and exits of one of the hundreds of Bear centers in Tarkov.");

        var assortAna = modHelper.GetJsonDataFromFile<TraderAssort>(pathToMod, "db/anastasiaAssort.json");
        var assortEve = modHelper.GetJsonDataFromFile<TraderAssort>(pathToMod, "db/evelynAssort.json");
        var assortSve = modHelper.GetJsonDataFromFile<TraderAssort>(pathToMod, "db/svetlanaAssort.json");

        addCustomTraderHelper.OverwriteTraderAssort(traderBaseAna.Id, assortAna);
        addCustomTraderHelper.OverwriteTraderAssort(traderBaseEve.Id, assortEve);
        addCustomTraderHelper.OverwriteTraderAssort(traderBaseSve.Id, assortSve);

        cancellationToken.ThrowIfCancellationRequested();
        await wttCommon.CustomQuestService.CreateCustomQuests(Assembly.GetExecutingAssembly());
    }
}
