export interface Cryptocurrency {
  id: string
  name: string
  symbol: string
  ath:number
  ath_date: string
  atl:number
  atl_date: string
  image: string
  current_price: number
  market_cap: number
  total_volume: number
  price_change_percentage_24h: number
  sparkline_in_7d: {
    price: number[]
  }
}