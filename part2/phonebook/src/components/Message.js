const Message = ({ info }) => {
  const styles = {
    color: info.msgColor,
    border: 1,
    display: info.show ? "block" : "none",
  }
  return (
    <div style={styles}>
      <p>{info.message}</p>
    </div>
  )
}

export default Message
