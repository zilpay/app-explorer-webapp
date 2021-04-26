export const EXPLORER = "0x0c20e40b3fe650c4c767db6bbb93db8295beac40";
export default {
  methods: {
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
        }, 100);
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
    async __getAps(category) {
      const field = "app_list";

      try {
        let list = await this.__getSubState(EXPLORER, field, [String(category)]);

        list = list[category];
        list = Object.values(list).map((el) => ({
          title: el.arguments[0],
          description: el.arguments[1],
          url: el.arguments[2],
          images: el.arguments[3],
          icon: el.arguments[4],
          category: el.arguments[5]
        }));
        

        return list;
      } catch (err) {
        console.log(err)
        return [];
      }
    }
  }
};
