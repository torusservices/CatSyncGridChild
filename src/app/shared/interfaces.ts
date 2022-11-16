export interface Product {
  key: string;
  category: string;
  image: string;
  price: number;
  quantitative: boolean;
  sold: boolean;
  title: string;
}

export interface CartItem {
  key: string;
  quantitative: boolean;
  quantity: number;
  title: string;
  unitPrice: number;
}

export interface Order {
  key: string;
  items: CartItem[];
}

export interface User {
  uid: string;
  email: string;
}

export interface Metals {
  success:	boolean ;
  timestamp:	number ;
  date:	string;
  base:	string;
	rates: MetalRates[];		
}


export interface MetalRates {
  AED	:		number ;
  AFN	:		number ;
  ALL	:		number ;
  AMD	:		number ;
  ANG	:		number ;
  AOA	:		number ;
  ARS	:		number ;
  AWG	:		number ;
  AZN	:		number ;
  BAM	:		number ;
  BBD	:		number ;
  BDT	:		number ;
  BGN	:		number ;
  BHD	:		number ;
  BIF	:		number ;
  BMD	:		number ;
  BND	:		number ;
  BOB	:		number ;
  BRL	:		number ;
  BSD	:		number ;
  BTN	:		number ;
  BWP	:		number ;
  BYN	:		number ;
  BYR	:		number ;
  BZD	:		number ;
  CAD	:		number ;
  CDF	:		number ;
  CHF	:		number ;
  CLF	:		number ;
  CLP	:		number ;
  CNY	:		number ;
  COP	:		number ;
  CRC	:		number ;
  CUC	:		number ;
  CVE	:		number ;
  CZK	:		number ;
  DJF	:		number ;
  DKK	:		number ;
  DOP	:		number ;
  DZD	:		number ;
  EGP	:		number ;
  ETB	:		number ;
  EUR	:		number ;
  FJD	:		number ;
  FKP	:		number ;
  GBP	:	number ;
  GEL	:		number ;
  GHS	:		number ;
  GIP	:		number ;
  GMD	:		number ;
  GNF	:		number ;
  GTQ	:		number ;
  GYD	:		number ;
  HKD	:		number ;
  HNL	:		number ;
  HRK	:		number ;
  HTG	:		number ;
  HUF	:		number ;
  IDR	:		number ;
  ILS	:		number ;
  INR	:		number ;
  IQD	:		number ;
  ISK	:		number ;
  JMD	:		number ;
  JOD	:		number ;
  JPY	:		number ;
  KES	:		number ;
  KGS	:		number ;
  KHR	:		number ;
  KMF	:		number ;
  KRW	:		number ;
  KWD	:		number ;
  KYD	:		number ;
  KZT	:		number ;
  LAK	:		number ;
  LBP	:	number ;
  LKR	:	number ;
  LRD	:		number ;
  LSL	:		number ;
  LYD	:	number ;
  MAD	:		number ;
  MDL	:		number ;
  MGA	:		number ;
  MKD	:		number ;
  MMK	:		number ;
  MNT	:		number ;
  MOP	:		number ;
  MUR	:		number ;
  MVR	:		number ;
  MWK	:		number ;
  MXN	:		number ;
  MYR	:		number ;
  MZN	: 	number ;
  NAD	:		number ;
  NGN	:		number ;
  NIO	:		number ;
  NOK	:		number ;
  NPR	:		number ;
  NZD	:		number ;
  OMR : 	number ;
}