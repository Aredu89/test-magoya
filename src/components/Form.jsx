import React from 'react';
import DatePicker from "react-datepicker";
import NumberFormat from 'react-number-format';

const DatePickerElement = props => {
  const ButtonInput = ({ value, onClick }) => (
    <button className="custom-date-input" onClick={onClick}>
      {value}
    </button>
  )
  return (
    <div className="mb-3">
      <div className="form-label">Date</div>
      <DatePicker
        selected={props.date}
        onChange={date => props.setDate(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="time"
        dateFormat="MMMM d, yyyy h:mm aa"
        customInput={<ButtonInput />}
        withPortal
      />
    </div>
  )
}

const InputAmount = props => {
  return (
    <div className="mb-3">
      <div className="form-label">Amount</div>
      <NumberFormat
        className='input-amount'
        thousandSeparator={true}
        prefix={'$'}
        value={props.amount}
        onValueChange={values=>props.setAmount(Number(values.value))} 
      />
    </div>
  )
}

const InputDescription = props => {
  return (
    <div>
      <div className="form-label">Description</div>
      <textarea
        className="input-description"
        value={props.description}
        rows='3'
        onChange={event=>props.setDescription(event.target.value)}
      />
    </div>
  )
}

const Form = props => {

  const { date, amount, description } = props

  return (
    <div className="form">
      <DatePickerElement
        date={date.date}
        setDate={date.setDate}
      />
      <InputAmount 
        amount={amount.amount}
        setAmount={amount.setAmount}
      />
      <InputDescription
        description={description.description}
        setDescription={description.setDescription}
      />
    </div>
  )
}

export default Form;