export const ContactPage = () => {
  return (
    <>
      <section id="contact">
        <div id="container">
          <div className="information">
            <div className="title">Contact Details</div>
            <div className="address">
              785 15h Street, Office 478 Berlin, De 81566
            </div>
            <div className="email">info@email.com</div>
            <div className="phone">+1 840 841 25 69</div>
            <div className="social">
              <div>
                <a href="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="40px"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"
                      fill="#3a86ff"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="form">
            <form action="">
              <div className="row">
                <div className="input">
                  <label htmlFor="name">
                    <img src="../../assets/icons/user.svg" alt="Name" />
                  </label>
                  <input type="text" name="name" id="name" placeholder="Name" />
                </div>
                <div className="input">
                  <label htmlFor="email">
                    <img src="../../assets/icons/email.svg" alt="Email" />
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="row">
                <div className="input">
                  <label htmlFor="phone">
                    <img src="../../assets/icons/phone.svg" alt="Phone" />
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Phone"
                  />
                </div>
                <div className="input">
                  <label htmlFor="subject">
                    <img src="../../assets/icons/notice.svg" alt="Subject" />
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    placeholder="Subject"
                  />
                </div>
              </div>
              <div className="row">
                <div className="input textarea">
                  <label htmlFor="message">
                    <img src="../../assets/icons/pen.svg" alt="Message" />
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows="3"
                    placeholder="How can we help you? Feel free to get in touch!"
                  ></textarea>
                </div>
              </div>
              <div className="row">
                <button className="button-send">
                  <span>
                    <img src="../../assets/icons/send.svg" alt="Button send" />
                  </span>
                  Get In Touch
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <section>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.314180573685!2d108.23734327575978!3d16.04917813997318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421762ef765a43%3A0x2f31a3814ac255ea!2zMTYgQW4gVGjGsOG7o25nIDE4LCBC4bqvYyBN4bu5IFBow7osIE5nxakgSMOgbmggU8ahbiwgxJDDoCBO4bq1bmcgNTUwMDAwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1699108185074!5m2!1svi!2s"
          width="100%"
          height="600px"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </>
  );
};
