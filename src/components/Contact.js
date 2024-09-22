import React from 'react'

const Contact = () => {
  return (
    <div>
        <h1>Contact</h1>
        <form>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="Message" />
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default Contact;