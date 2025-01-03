import * as React from 'react'
import colors from 'src/styles/colors'
import Svg, { Path } from 'svgs'

interface Props {
  height?: number
  width?: number
  color?: string
}

export default class BankIcon extends React.PureComponent<Props> {
  static defaultProps = {
    height: 32,
    width: 32,
    color: colors.accent,
  }

  render() {
    return (
      <Svg width={this.props.width} height={this.props.height} viewBox="0 0 24 24" fill="none">
        <Path
          d="M11.2852 0.594128C11.0584 0.424838 10.783 0.333374 10.5 0.333374C10.217 0.333374 9.9416 0.424838 9.71483 0.594128L0.414167 7.53696C-0.373333 8.12438 0.0425834 9.37563 1.02433 9.37563H19.9763C20.9586 9.37563 21.3739 8.12438 20.587 7.53696L11.2852 0.594128ZM10.5 6.16788C10.1906 6.16788 9.89384 6.04496 9.67504 5.82617C9.45625 5.60738 9.33333 5.31063 9.33333 5.00121C9.33333 4.69179 9.45625 4.39505 9.67504 4.17625C9.89384 3.95746 10.1906 3.83454 10.5 3.83454C10.8094 3.83454 11.1062 3.95746 11.325 4.17625C11.5438 4.39505 11.6667 4.69179 11.6667 5.00121C11.6667 5.31063 11.5438 5.60738 11.325 5.82617C11.1062 6.04496 10.8094 6.16788 10.5 6.16788ZM0 20.3125C0 18.6209 1.37083 17.25 3.0625 17.25H9.9995C9.56118 18.0026 9.33124 18.8583 9.33333 19.7292C9.33333 20.5167 9.51708 21.2605 9.842 21.9167H0.729167C0.326667 21.9167 0 21.59 0 21.1875V20.3125ZM11.6667 15.5607C12.3718 15.1389 13.1783 14.9166 14 14.9173V10.5423H11.6667V15.5607ZM16.3333 14.9173H18.6667V10.5423H16.3333V14.9173ZM4.66667 16.084H2.33333V10.5423H4.66667V16.084ZM7 10.5423V16.084H9.33333V10.5423H7ZM14.1458 16.084C13.6632 16.0779 13.1842 16.1676 12.7365 16.3481C12.2889 16.5286 11.8815 16.7961 11.5381 17.1353C11.1946 17.4744 10.922 17.8783 10.7358 18.3237C10.5497 18.769 10.4539 19.2468 10.4539 19.7295C10.4539 20.2122 10.5497 20.69 10.7358 21.1353C10.922 21.5807 11.1946 21.9846 11.5381 22.3237C11.8815 22.6629 12.2889 22.9304 12.7365 23.1109C13.1842 23.2914 13.6632 23.3811 14.1458 23.375H15.0208C15.2142 23.375 15.3997 23.2982 15.5364 23.1615C15.6732 23.0247 15.75 22.8393 15.75 22.6459C15.75 22.4525 15.6732 22.267 15.5364 22.1303C15.3997 21.9935 15.2142 21.9167 15.0208 21.9167H14.1458C13.5657 21.9167 13.0093 21.6862 12.599 21.276C12.1888 20.8658 11.9583 20.3094 11.9583 19.7292C11.9583 19.149 12.1888 18.5926 12.599 18.1824C13.0093 17.7722 13.5657 17.5417 14.1458 17.5417H15.0208C15.2142 17.5417 15.3997 17.4649 15.5364 17.3281C15.6732 17.1914 15.75 17.0059 15.75 16.8125C15.75 16.6192 15.6732 16.4337 15.5364 16.2969C15.3997 16.1602 15.2142 16.0834 15.0208 16.0834H14.1458V16.084ZM19.6875 16.084C20.1701 16.0779 20.6491 16.1676 21.0968 16.3481C21.5444 16.5286 21.9518 16.7961 22.2953 17.1353C22.6387 17.4744 22.9114 17.8783 23.0975 18.3237C23.2836 18.769 23.3795 19.2468 23.3795 19.7295C23.3795 20.2122 23.2836 20.69 23.0975 21.1353C22.9114 21.5807 22.6387 21.9846 22.2953 22.3237C21.9518 22.6629 21.5444 22.9304 21.0968 23.1109C20.6491 23.2914 20.1701 23.3811 19.6875 23.375H18.8125C18.6191 23.375 18.4336 23.2982 18.2969 23.1615C18.1602 23.0247 18.0833 22.8393 18.0833 22.6459C18.0833 22.4525 18.1602 22.267 18.2969 22.1303C18.4336 21.9935 18.6191 21.9167 18.8125 21.9167H19.6875C20.2677 21.9167 20.8241 21.6862 21.2343 21.276C21.6445 20.8658 21.875 20.3094 21.875 19.7292C21.875 19.149 21.6445 18.5926 21.2343 18.1824C20.8241 17.7722 20.2677 17.5417 19.6875 17.5417H18.8125C18.6191 17.5417 18.4336 17.4649 18.2969 17.3281C18.1602 17.1914 18.0833 17.0059 18.0833 16.8125C18.0833 16.6192 18.1602 16.4337 18.2969 16.2969C18.4336 16.1602 18.6191 16.0834 18.8125 16.0834H19.6875V16.084ZM13.4167 19.7292C13.4167 19.3261 13.7433 19 14.1458 19H19.6875C19.8809 19 20.0664 19.0769 20.2031 19.2136C20.3398 19.3504 20.4167 19.5358 20.4167 19.7292C20.4167 19.9226 20.3398 20.1081 20.2031 20.2448C20.0664 20.3816 19.8809 20.4584 19.6875 20.4584H14.1458C13.7433 20.4584 13.4167 20.1317 13.4167 19.7292Z"
          fill={this.props.color}
        />
      </Svg>
    )
  }
}