"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraderUtils = void 0;
class TraderUtils {
    ref;
    constructor(ref) {
        this.ref = ref;
    }
    /**
     * Add profile picture to our trader
     * @param baseJson json file for trader (db/base.json)
     * @param preSptModLoader mod loader class - used to get the mods file path
     * @param imageRouter image router class - used to register the trader image path so we see their image on trader page
     * @param traderImageName Filename of the trader icon to use
     */
    registerProfileImage(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    baseJson, modName, traderImageName) {
        // Reference the mod "res" folder
        const imageFilepath = `./${this.ref.preSptModLoader.getModPath(modName)}res`;
        // Register a route to point to the profile picture - remember to remove the .jpg from it
        this.ref.imageRouter.addRoute(baseJson.avatar.replace(".jpg", ""), `${imageFilepath}/${traderImageName}.jpg`);
    }
    /**
     * Add record to trader config to set the refresh time of trader in seconds (default is 60 minutes)
     * @param traderConfig trader config to add our trader to
     * @param baseJson json file for trader (db/base.json)
     * @param refreshTimeSeconds How many sections between trader stock refresh
     */
    setTraderUpdateTime(traderConfig, 
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    baseJson, minSeconds, maxSeconds) {
        // Add refresh time in seconds to config
        const traderRefreshRecord = {
            traderId: baseJson._id,
            seconds: {
                min: minSeconds,
                max: maxSeconds,
            },
        };
        traderConfig.updateTime.push(traderRefreshRecord);
    }
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    addAnastasiaToDb(traderDetailsToAdd, assort) {
        this.ref.tables.traders[traderDetailsToAdd._id] = {
            assort: this.ref.jsonUtil.deserialize(this.ref.jsonUtil.serialize(assort)),
            base: this.ref.jsonUtil.deserialize(this.ref.jsonUtil.serialize(traderDetailsToAdd)),
            questassort: {
                started: {},
                success: {},
                fail: {},
            },
        };
    }
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    addEvelynToDb(traderDetailsToAdd, assort) {
        this.ref.tables.traders[traderDetailsToAdd._id] = {
            assort: this.ref.jsonUtil.deserialize(this.ref.jsonUtil.serialize(assort)),
            base: this.ref.jsonUtil.deserialize(this.ref.jsonUtil.serialize(traderDetailsToAdd)),
            questassort: {
                started: {},
                success: {
                    "678a330e1a51a8fee10b17cb": "677fdcd382e30db2828dee1f",
                    "678a330e203e24a3a2dcb97b": "677fdcd382e30db2828dee1f",
                    "67dac72b892adbf982f51271": "677fdcd382e30db2828dee1f",
                    "67dac72b87a1e043bb1d3cf3": "677fdcd3228ae8e73f55e317",
                    "67dac73189642c56042356f6": "677fdcd3228ae8e73f55e317",
                    "67dac731b7a84ac4bd72577c": "677fdcd3228ae8e73f55e317",
                    "67dac73c0522d575e17e6df4": "677fdcd9a0f157df28e42320",
                    "67dac73129c42af89ae40bd9": "677fdcd94fda0fe97e6fce2d",
                    "67dac731c0b6f8dbbcfd3918": "677fdcd94fda0fe97e6fce2d",
                    "67dac734df3448a81725b2f5": "677fdcd93b7a02416be7b402",
                    "67dac734f04a409181d965e2": "677fdcd93b7a02416be7b402",
                    "67dac73421416db4ac7988ff": "677fdcdc74bbd8efd2740532",
                    "67dac7361273dad02a846461": "677fdcdc74bbd8efd2740532",
                    "67dac73667f4a3702ee01a22": "677fdcdc8f9d5e854a8c7c46",
                    "67dac73641cb8c6490e3793a": "677fdcdc8f9d5e854a8c7c46"
                },
                fail: {},
            },
        };
    }
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    addSvetlanaToDb(traderDetailsToAdd, assort) {
        this.ref.tables.traders[traderDetailsToAdd._id] = {
            assort: this.ref.jsonUtil.deserialize(this.ref.jsonUtil.serialize(assort)),
            base: this.ref.jsonUtil.deserialize(this.ref.jsonUtil.serialize(traderDetailsToAdd)),
            questassort: {
                started: {},
                success: {
                    "67dac7367ced418f92ed6644": "677fdcdc374fd42fac57454e",
                    "67dac736e5c6e3c3104bd7eb": "677fdcdc374fd42fac57454e",
                    "67dac736783c05771f3c9e3d": "677fdcdc374fd42fac57454e",
                    "67dac7392f069439b10cc767": "677fdcdc4e5bfe56a2f35adf",
                    "67dac73995b3908bc14c0c7b": "677fdcdc4e5bfe56a2f35adf",
                    "67dac73984a625d4ba9315fb": "677fdcdc4e5bfe56a2f35adf",
                    "67dac73947ba3fa9657ee619": "677fdcdc4e5bfe56a2f35adf",
                    "67dac739bcb8389590f7d2b8": "677fdcdca4df7500db1c7eb6",
                    "67dac7397f5d36fef7a8c452": "677fdcdca4df7500db1c7eb6",
                    "67dac73c2454b696b119945b": "677fdcdca4df7500db1c7eb6",
                    "67dac73cf492ebc227aaecf0": "677fdcdca4df7500db1c7eb6",
                    "67dac73c782724755b949b9e": "677fdcdca4df7500db1c7eb6",
                    "67dd4663e9c1aa94339dc77e": "677fdcdceb821521b2761751",
                    "67dd466333684d68a31374d4": "677fdcdceb821521b2761751",
                    "67dd46637064235ad57657ea": "677fdcdceb821521b2761751",
                    "67dd4663366c07026fb9cc19": "677fdcdceb821521b2761751",
                    "67dd46637d6680fe36717a03": "677fdcdceb821521b2761751",
                    "67dd4667f347c36aa588987b": "677fdcde5668be37ab010401",
                    "67dd46672d64f44879e7fda3": "677fdcde5668be37ab010401",
                    "67dd466741d4a40f66e371b9": "677fdcde5668be37ab010401",
                    "67dd4667816e1c541cd4cd71": "677fdcde3ffc9a72b05f7b3d",
                    "67dd46671282595662a40771": "677fdcde3ffc9a72b05f7b3d",
                    "67dd466a8ec148c05838320b": "677fdcde6f467e69792b5793",
                    "67dd466a5e33a91e26d74e79": "677fdcde6f467e69792b5793",
                    "67dd466ab30ee5de5f39c6ef": "677fdce0d063b4d3a555643e",
                    "67dd466a662a995bede5238c": "677fdce0d063b4d3a555643e",
                    "67dd466a08323b86a3680e66": "677fdce0d063b4d3a555643e",
                    "67dd466ad40b5400f3ac57ea": "677fdce0d063b4d3a555643e",
                    "67dd466a7310e8b5fdc757ee": "677fdce0b9e0353fd054ab8b",
                    "67dd466de6db7f3dba7d651f": "677fdce0b9e0353fd054ab8b",
                    "67dd466d45b6cbf1e11b9398": "677fdce06051214651d8256b",
                    "67dd466d55c7e363da849cd4": "677fdce06051214651d8256b",
                    "67dd4671eede3f0ed2f7b085": "67891505a1b7117a38a8a8c0",
                    "67dd6b128262c9739035876d": "67891505a1b7117a38a8a8c0",
                    "67dd6b12b6600a084e9c20d2": "67891505a1b7117a38a8a8c0",
                    "67dd6b1254bc7093f84419e7": "67891505d5dce2a9dd065c78",
                    "67dd6b1244f39ba156568649": "67891505d5dce2a9dd065c78",
                    "67dd6b237c6b613c4bc0c6b0": "677fdce0a6dc7b63057575ff",
                    "67dd6b235c34f5bd0e3a8e49": "677fdce0a6dc7b63057575ff",
                    "67dd6b233062013becbadade": "677fdce0a6dc7b63057575ff",
                    "67dd6b23aa13e1986d9d5acf": "677fdce0a6dc7b63057575ff",
                    "67dd6b20a20c1511943716be": "67891505f20c78ce0c1a98ea",
                    "67dd6b207952ff9661afcd46": "67891505f20c78ce0c1a98ea",
                    "67dd6b20e7544a85bbd8d06b": "67891505f20c78ce0c1a98ea",
                    "67dd6b2056841815da78db80": "67891505f20c78ce0c1a98ea",
                    "67dd6b20df915d5fc82ca26d": "67891505f20c78ce0c1a98ea",
                    "67dd6b1d5d89043373836c5e": "67891505f20c78ce0c1a98ea",
                    "67dd6b1d3b88e42b4dc5d2bb": "67891505f20c78ce0c1a98ea",
                    "67dd6b1d08b9069fe36e12ff": "67891505f20c78ce0c1a98ea",
                    "67dd6b1d54c9c5dbe6020ca5": "677fdce09f02e1f590d15f13",
                    "67dd6b1ddf545ef4c4691101": "677fdce09f02e1f590d15f13",
                    "67dd6b1dc3219caf33ecf43e": "677fdce09f02e1f590d15f13",
                    "67dd6b1dcea8db9021e14b7e": "67891505f13228ccb0de1310",
                    "67dd6b1de32dc44815c9dc02": "67891505f13228ccb0de1310",
                    "678915099f49333cc6f43993": "67891509ee5741d512a21ddd",
                    "678915094c23b10cc65183b7": "67891509ee5741d512a21ddd",
                    "67891509b1d3f953e6593422": "67891509d5014d390b4146af",
                    "678915092ef5543712b62924": "678915094c1e4de05a16e31b",
                    "67891509793719caed94afcd": "67891509181977a9071c349f",
                    "678915091cfde2827ef35d9d": "678915095470e9ec10f17711",
                    "678915098b7641b556f25ef3": "678915096100e3ed29bb2b1d",
                    "6789150d059d33a7f3c0f967": "6789150dc2e5fe1ad4fe3944",
                    "6789150dbfa7636976fd4ed5": "6789150dc2e5fe1ad4fe3944",
                    "6789150df62a8339c0bff5b4": "6789150de83f10016464ed26"
                },
                fail: {}
            },
        };
    }
    /**
     * Add traders name/location/description to the locale table
     * @param baseJson json file for trader (db/base.json)
     * @param tables database tables
     * @param fullName Complete name of trader
     * @param firstName First name of trader
     * @param nickName Nickname of trader
     * @param location Location of trader (e.g. "Here in the cat shop")
     * @param description Description of trader
     */
    addTraderToLocales(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    baseJson, fullName, firstName, nickName, location, description) {
        // For each language, add locale for the new trader
        const locales = Object.values(this.ref.tables.locales.global);
        for (const locale of locales) {
            locale[`${baseJson._id} FullName`] = fullName;
            locale[`${baseJson._id} FirstName`] = firstName;
            locale[`${baseJson._id} Nickname`] = nickName;
            locale[`${baseJson._id} Location`] = location;
            locale[`${baseJson._id} Description`] = description;
        }
    }
}
exports.TraderUtils = TraderUtils;
//# sourceMappingURL=Utils.js.map