import { NativeModules } from 'react-native';

const { CheckoutMercadoPagoModule } = NativeModules;

const defaultOptions = {
    backgroundColor: "#009EE3",
    enableDarkFont: false
};

export class MercadoPagoCheckout {

    /**
     * This function starts MercadoPago checkout to get a PaymentResult object, so you don't create the Payment in your servers.
     *
     * @param publicKey - MercadoPago API public Key
     * @param preferenceId - MercadoPago Items preference id
     * @param options - An Object containing properties like: backgroundColor, enableDarkFont
     * @returns {Promise.<*>} - Promise that if resolves gives a PaymentResult object
     */
    static async startForPayment(publicKey, preferenceId, options = defaultOptions) {
        MercadoPagoCheckout._checkParams({ ...options, publicKey, preferenceId });

        return await CheckoutMercadoPagoModule.startCheckoutForPayment(publicKey, preferenceId, options.backgroundColor, options.enableDarkFont);
    }

    /**
     * This function starts MercadoPago checkout to get a PaymentData object, so you can create the Payment in your servers.
     *
     * @param publicKey - MercadoPago API public Key
     * @param preferenceId - MercadoPago Items preference id
     * @param options - An Object containing properties like: backgroundColor, enableDarkFont
     * @returns {Promise.<*>} - Promise that if resolves gives a PaymentData object
     */
    static async startForPaymentData(publicKey, preferenceId, options = defaultOptions) {
        MercadoPagoCheckout._checkParams({ ...options, publicKey, preferenceId });

        return await CheckoutMercadoPagoModule.startCheckoutForPaymentData(publicKey, preferenceId, options.backgroundColor, options.enableDarkFont);
    }

    static _validate(key, value) {
        if (!value) {
            throw `${key} required to start MercadoPago checkout`;
        }
    }

    static _checkParams(params) {
        Object.keys(params).forEach(key => MercadoPagoCheckout._validate(key, params[key]));
    }
}

