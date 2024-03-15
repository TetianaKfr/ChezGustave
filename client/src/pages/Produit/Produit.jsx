import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer"
import { Navbar } from "../../components/Navbar/Navbar"
import "./Produit.css"
import BookingDatesContext from "../../BookingDatesContext";
import jsDateToHtmlDate from "../../JsDateToHtmlDate";

export const Produit = ({ housings }) => {
  const { housing_name } = useParams();
  const { bookingDates, setBookingDates } = useContext(BookingDatesContext);

  const housing = housings.find(housing => housing.name == housing_name);
  if (housing == undefined) {
    return "Chargement...";
  }

  const book_housing = async _ => {
    try {
      await fetch("http://localhost:3630/bookings", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          housing_name,
          chef_available: true,
          start: bookingDates.start == undefined ? undefined : bookingDates.start.toDateString(),
          end: bookingDates.end == undefined ? undefined : bookingDates.end.toDateString(),
          visit_date: new Date().toDateString(),
        }),
      });
    } catch (_) { }
  };

  return (
    <>
      <Navbar />
      <div className="detailsProduit displayMobile">
        <h2>{housing.name}</h2>
        <h4>{housing.area}</h4>
      </div>

      <div className="wrapper">
        <div className="divImg">
          <img className="mainImg" src={"http://localhost:3630/uploads/" + housing.images_urls[0]} alt="img principal affichée" />
          <div className="displayMiniImg">
            <img className="miniImg" src="" alt="img mini " />
            <img className="miniImg" src="" alt="img mini" />
            <img className="miniImg" src="" alt="img mini" />
            <img className="miniImg" src="" alt="img mini" />
          </div>
        </div>

        <div className="detailsProduit">
          <h2 className="displayDesktop">{housing.name}</h2>
          <h4 className="displayDesktop">{housing.area}</h4>
          <p>{housing.description}</p>
          <div className="boutonsReserv">
            <div className="row">
              <input
                type="date"
                id="departureDate"
                value={bookingDates.start == null ? "" : jsDateToHtmlDate(bookingDates.start)}
                onChange={e => setBookingDates(dates => ({ start: e.target.valueAsDate, end: dates.end }))}
              />
              <input
                type="date"
                id="arrivalDate"
                value={bookingDates.end == null ? "" : jsDateToHtmlDate(bookingDates.end)}
                onChange={e => setBookingDates(dates => ({ start: dates.start, end: e.target.valueAsDate }))}
              />
            </div>
            <button onClick={book_housing}>
              Reservez votre sejour
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
