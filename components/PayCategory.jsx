import React from 'react'
import PropTypes from 'prop-types'
// connectとは、Reduxの「store」にReactがアクセスするための関数
import { connect } from 'react-redux'
import { changePayType } from '../store/Action'
import styles from '../styles/components/payCategory.module.scss'


class PayCategory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeId: this.props.payType
    }
  }
  handleClick(event, id) {
    console.log(event)

    if (this.state.activeId === id) {
      return false
    } else {
      let removeClassEl = document.getElementById(this.state.activeId)
      removeClassEl.classList.remove('active')
      this.setState({ activeId: id })
      event.target.classList.add('active')
    }

    // storeに送信する
    this.props.changePayType({
      id: id,
      txt: event.target.innerText
    })
  }

  render() {
    console.log('🐣 PayCategory')

    return (
      <ul className={styles.list}>
        <li className={styles.list_item}>
          <button
            className={`c-btn--small` + (this.state.activeId === "expense" ? ' active' : '')}
            id="expense"
            onClick={(event) => this.handleClick(event, 'expense')}
          >支出</button>
        </li>
        <li className={styles.list_item}>
          <button
            className={`c-btn--small` + (this.state.activeId === "income" ? ' active' : '')}
            id="income"
            onClick={(event) => this.handleClick(event, 'income')}
          >収入</button>
        </li>
        <li className={styles.list_item}>
          <button
            className={`c-btn--small` + (this.state.activeId === "forward" ? ' active' : '')}
            id="forward"
            onClick={(event) => this.handleClick(event, 'forward')}
          >立替</button>
        </li>
      </ul>
    )
  }
}

PayCategory.propTypes = {
  changePayType: PropTypes.func,
  payType: PropTypes.string,
  payTxt: PropTypes.string
}

function mapStateToProps(state) {
  return {
    payType: state.data.pay.id,
    payTxt: state.data.pay.txt
  }
}

// mapDispatchToPropsは、dispatchを呼び出す関数をpropsに入れて子コンポーネントに渡す
function mapDispatchToProps(dispatch) {
  return {
    changePayType: (payType) => dispatch(changePayType(payType)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PayCategory)
