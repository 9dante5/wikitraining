import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

initMercadoPago('TEST-23372793-ec37-46e1-9087-e8c1e297e6c1');

const Payment = () => {
    return (
        <>
            <Wallet initialization={{ preferenceId: '<PREFERENCE_ID>' }} customization={{ texts: { valueProp: 'smart_option' } }} />
        </>
    )
}

export default Payment
