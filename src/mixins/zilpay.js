import { mapMutations } from "vuex";
import Big from "big.js";

Big.PE = 99;
export const ZLP = "0x5a16db0e4954e3436137109548fa2c94aea1fd97";
export const EXPLORER = "0x64775441ce56bce245807389fccbae4e31b484b6";
export const MODERATOR = "0x8a8ffe488e6ed9bf14d6b0f275232ac3da48802f";
export const DISTRIBUTOR = "0x52777257408f4bca9d2fdceca4b3c3be4827f82c";

const _decimal = Big("1000000000000000000"); // 10^18
export default {
  data() {
    return {
      ZLP,
      EXPLORER,
      MODERATOR,
      DISTRIBUTOR
    };
  },
  methods: {
    ...mapMutations([
      "setAppList"
    ]),
    async __connect() {
      const zilPay = await this.__zilpay();

      if (zilPay.wallet.isConnect && zilPay.wallet.isEnable) {
        return true;
      }

      const connected = await zilPay.wallet.connect();

      return connected;
    },
    async __zilpay() {
      if (typeof window["zilPay"] !== "undefined") {
        return Promise.resolve(window["zilPay"]);
      }

      return new Promise((resolve, reject) => {
        let k = 0;
        const i = setInterval(() => {
          if (k >= 10) {
            clearInterval(i);
            return reject("ZilPay inot installed");
          }

          if (typeof window["zilPay"] !== "undefined") {
            clearInterval(i);
            return resolve(window["zilPay"]);
          }

          k++;
        }, 300);
      });
    },
    async __getZLPBalance() {
      const field = "balances";
      const zilPay = await this.__zilpay();
      const owner = String(zilPay.wallet.defaultAccount.base16).toLowerCase();
      const value = await this.__getSubState(ZLP, field, [owner]);

      if (!value || !value[owner]) {
        return '0';
      }

      try {
        return value[owner];
      } catch (err) {
        return '0'
      }
    },
    async __increaseAllowance(address) {
      const zilPay = await this.__zilpay();
      const { contracts, utils } = zilPay;
      const contract = contracts.at(ZLP);
      const amount = utils.units.toQa('0', utils.units.Units.Zil);
      const gasPrice = utils.units.toQa('2000', utils.units.Units.Li);
      const balance = await this.__getZLPBalance();

      return await contract.call(
        'IncreaseAllowance',
        [
          {
            vname: 'spender',
            type: 'ByStr20',
            value: address
          },
          {
            vname: 'amount',
            type: 'Uint128',
            value: String(balance)
          }
        ],
        {
          amount,
          gasPrice,
          gasLimit: utils.Long.fromNumber(5000)
        }
      );
    },
    async __isUnlocked(amount) {
      const field = "allowances";
      const zilPay = await this.__zilpay();
      const owner = String(zilPay.wallet.defaultAccount.base16).toLowerCase();
      const value = await this.__getSubState(ZLP, field, [owner, DISTRIBUTOR]);

      if (!value || !value || !value[owner] || !value[owner][DISTRIBUTOR]) {
        return false;
      }

      const _decimal = Big('1000000000000000000');
      const _value = Big(amount);
      const _amount = _value.mul(_decimal);
      const approved = Big(value[owner][DISTRIBUTOR]);

      return approved.gte(_amount);
    },
    async __getSubState(address, field, value = []) {
      const zilPay = await this.__zilpay();

      await this.__connect();

      try {
        const data = await zilPay
          .blockchain
          .getSmartContractSubState(address, field, value);

        return data.result[field];
      } catch {
        return null;
      }
    },
    async __getAps(category, owner) {
      const field = "app_list";
      const params = [String(category)];

      if (owner) {
        params.push(owner);
      }

      try {
        let list = await this.__getSubState(EXPLORER, field, params);

        list = list[category];
        list = Object.keys(list).map((owner) => ({
          owner,
          title: list[owner].arguments[0],
          description: list[owner].arguments[1],
          url: list[owner].arguments[2],
          images: list[owner].arguments[3],
          icon: list[owner].arguments[4],
          category: list[owner].arguments[5]
        }));

        this.setAppList(list);

        return list;
      } catch (err) {
        console.log(err)
        return [];
      }
    },
    async __addAd(amountZLP, url, hash) {
      const zilPay = await this.__zilpay();
      const { contracts, utils } = zilPay;
      const contract = contracts.at(DISTRIBUTOR);
      const gasPrice = utils.units.toQa("2000", utils.units.Units.Li);
      const gasLimit = 10000;
      let _amountZLP = Big(String(amountZLP));

      _amountZLP = _amountZLP.mul(_decimal);
      _amountZLP = _amountZLP.round();

      return await contract.call(
        "AddAdvertising",
        [
          {
            vname: "amount",
            type: "Uint128",
            value: String(_amountZLP)
          },
          {
            vname: "url",
            type: "String",
            value: String(url)
          },
          {
            vname: "ipfs",
            type: "String",
            value: hash
          }
        ],
        {
          amount: "0",
          gasPrice,
          gasLimit: utils.Long.fromNumber(gasLimit)
        }
      )
    },
    async __addApplication(title, desUrl, url, ipfsImages, ipfsIcon, category) {
      const zilPay = await this.__zilpay();
      const { contracts, utils } = zilPay;
      const contract = contracts.at(DISTRIBUTOR);
      const gasPrice = utils.units.toQa("2000", utils.units.Units.Li);
      const gasLimit = 2000;

      return await contract.call(
        "AddApp",
        [
          {
            vname: "title",
            type: "String",
            value: title
          },
          {
            vname: "des_url",
            type: "String",
            value: desUrl
          },
          {
            vname: "url",
            type: "String",
            value: url
          },
          {
            vname: "ipfs_image",
            type: "List String",
            value: ipfsImages
          },
          {
            vname: "ipfs_icon",
            type: "String",
            value: ipfsIcon
          },
          {
            vname: "category",
            type: "Uint32",
            value: String(category)
          }
        ],
        {
          amount: "0",
          gasPrice,
          gasLimit: utils.Long.fromNumber(gasLimit)
        }
      )
    }
  }
};
