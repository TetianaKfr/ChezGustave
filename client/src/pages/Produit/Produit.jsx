import { Footer } from "../../components/Footer/Footer"
import { Navbar } from "../../components/Navbar/Navbar"
import "./Produit.css"
import LogoCalendrier from '../../assets/calendrier.png'

export const Produit = () => {
    return (
        <>
            <Navbar />
            <div className="detailsProduit displayMobile">
                    <h2>Nom logement</h2>
                    <h4>Pays,Region, Ville</h4>
            </div>

            <div className="wrapper">
                <div className="divImg">
                    <img className="mainImg" src="" alt="img principal affichée" />
                    <div className="displayMiniImg">
                        <img className="miniImg" src="" alt="img mini " />
                        <img className="miniImg" src="" alt="img mini" />
                        <img className="miniImg" src="" alt="img mini" />
                        <img className="miniImg" src="" alt="img mini" />
                    </div>
                </div>

                <div className="detailsProduit">
                    <h2 className="displayDesktop">Nom logement</h2>
                    <h4 className="displayDesktop">Pays,Region, Ville</h4>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis mollitia quis recusandae, eos iusto corporis aspernatur. Doloremque, illo nam in consequatur corporis asperiores quos quam, commodi illum facere earum ipsum!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis mollitia quis recusandae, eos iusto corporis aspernatur. Doloremque, illo nam in consequatur corporis asperiores quos quam, commodi illum facere earum ipsum!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis mollitia quis recusandae, eos iusto corporis aspernatur. Doloremque, illo nam in consequatur corporis asperiores quos quam, commodi illum facere earum ipsum!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis mollitia quis recusandae, eos iusto corporis aspernatur. Doloremque, illo nam in consequatur corporis asperiores quos quam, commodi illum facere earum ipsum!</p>
                    <div className="boutonsReserv">
                        <div className="column">
                            <button><img className="tailleLogo" src={LogoCalendrier} alt="Logo calendrier" />Arrivée</button>
                            <button><img className="tailleLogo" src={LogoCalendrier} alt="Logo Calendrier" />Depart</button>
                        </div> 
                        <button>Reservez votre sejour</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )

}