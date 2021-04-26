import { mapMutations } from 'vuex';

export const EXPLORER = "0x0c20e40b3fe650c4c767db6bbb93db8295beac40";
export default {
  methods: {
    ...mapMutations([
      'setAppList'
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
      })
    },
    async __getSubState(address, field, value = []) {
      const zilPay = await this.__zilpay();

      await this.__connect();

      const { result } = await zilPay
        .blockchain
        .getSmartContractSubState(address, field, value);

      return result[field];
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
    }
  }
};
