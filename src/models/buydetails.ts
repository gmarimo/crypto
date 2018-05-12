export interface Buydetails {
    usdamount: string;
    btcamount: string;
    commission: string;
    btcaftercommission: string;
    totalpayment: string;
}

export interface depositid{
    paymentrefid: string;
}

export interface withdrawbtc {
    withdraw_amnt: string;
    commission: string;
    withdraw_total: string;
    wallet_address: string;
}