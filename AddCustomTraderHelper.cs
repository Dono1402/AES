using SPTarkov.Common.Models.Logging;
using SPTarkov.DI.Annotations;
using SPTarkov.Server.Core.DI;
using SPTarkov.Server.Core.Models.Common;
using SPTarkov.Server.Core.Models.Eft.Common.Tables;
using SPTarkov.Server.Core.Models.Spt.Config;
using SPTarkov.Server.Core.Models.Spt.Tables;
using SPTarkov.Server.Core.Utils.Cloners;

namespace AES_Trader
{
    /// <summary>
    /// Helper for registering AES traders into the SPT database.
    /// </summary>
    [Injectable(TypePriority = OnLoadOrder.TraderRegistration + 1)]
    public class AddCustomTraderHelper(
        ISptLogger<AddCustomTraderHelper> logger,
        ICloner cloner,
        TradersTable tradersTable,
        LocaleTable localeTable)
    {
        /// <summary>
        /// Add the traders update time for when their offers refresh
        /// </summary>
        public void SetTraderUpdateTime(TraderConfig traderConfig, TraderBase baseJson, int refreshTimeSecondsMin, int refreshTimeSecondsMax)
        {
            var traderRefreshRecord = new UpdateTime
            {
                TraderId = baseJson.Id,
                Seconds = new MinMax<int>(refreshTimeSecondsMin, refreshTimeSecondsMax)
            };

            traderConfig.UpdateTime.Add(traderRefreshRecord);
        }

        /// <summary>
        /// Add a traders base data to the server, no assort items
        /// </summary>
        public void AddTraderWithEmptyAssortToDb(TraderBase traderDetailsToAdd)
        {
            var emptyTraderItemAssortObject = new TraderAssort
            {
                Items = [],
                BarterScheme = new Dictionary<MongoId, List<List<BarterScheme>>>(),
                LoyalLevelItems = new Dictionary<MongoId, int>()
            };

            var traderDataToAdd = new Trader
            {
                Assort = emptyTraderItemAssortObject,
                Base = cloner.Clone(traderDetailsToAdd),
                QuestAssort = new()
                {
                    { "Started", new() },
                    { "Success", new() },
                    { "Fail", new() }
                },
                Dialogue = []
            };

            tradersTable.TryAdd(traderDetailsToAdd.Id, traderDataToAdd);
        }

        /// <summary>
        /// Add traders name/location/description to all locales
        /// </summary>
        public void AddTraderToLocales(TraderBase baseJson, string firstName, string description)
        {
            var locales = localeTable.Global;
            var newTraderId = baseJson.Id;
            var fullName = baseJson.Name;
            var nickName = baseJson.Nickname;
            var location = baseJson.Location;

            foreach (var (_, localeKvP) in locales)
            {
                localeKvP.AddTransformer(lazyloadedLocaleData =>
                {
                    lazyloadedLocaleData.Add($"{newTraderId} FullName", fullName);
                    lazyloadedLocaleData.Add($"{newTraderId} FirstName", firstName);
                    lazyloadedLocaleData.Add($"{newTraderId} Nickname", nickName);
                    lazyloadedLocaleData.Add($"{newTraderId} Location", location);
                    lazyloadedLocaleData.Add($"{newTraderId} Description", description);
                    return lazyloadedLocaleData;
                });
            }
        }

        /// <summary>
        /// Overwrite the desired traders assorts with the ones provided
        /// </summary>
        public void OverwriteTraderAssort(MongoId traderId, TraderAssort newAssorts)
        {
            if (!tradersTable.TryGetValue(traderId, out var traderToEdit))
            {
                logger.Warning($"Unable to update assorts for trader: {traderId}, they couldn't be found on the server");
                return;
            }

            traderToEdit.Assort = newAssorts;
        }
    }
}
