import { Navbar } from '../../components/Navbar/Navbar';
import { Footer } from '../../components/Footer/Footer';
import "./MentionsLegales.css"
export const MentionsLegales = () => {


return(
    <>
    <Navbar />
    <div className="div-mentions-legales">
        <h1 id="title-mentions-legales" >Mentions Légales</h1>
    </div>
    <div className="div-mentions-legales">
        <p id="paragraph-mentions-legales" >
            Mentions Légales Hotels.com, L.P. opère le site Web chez Gustave qui sert d’interface entre vous et les divers prestataires proposant des services de locations.<br /><br />


            Contacter le service clients:<br /><br />

            Si vous avez des questions concernant vos locations,  Nous fournissons une assistance par numéro de téléphone : 02 96 00 00 00 ainsi que par e-mail : 
            chez-gustave.com, L.P., est une société établie en France 
            Lorsque vous effectuez une réservation pour un Service de locations (tel que défini dans les Conditions d’utilisation) en utilisant le site Web, vous concluez un contrat avec le Prestataire de locations (tel que défini dans les Conditions d’utilisation)<br /><br /> 

            Lorsque vous concluez un contrat avec un de nos associés fournisseur d’hébergement, les données relatives à l’associé de voyage se trouvent sur la page de finalisation de votre réservation.<br /><br />


            Marques déposées et droits d’auteur
            Si vous avez des questions concernant l’utilisation ou l’octroi de licences de marques déposées ou de documents protégés par des droits d’auteur, veuillez nous contacter à l’adresse suivante : service@chezgustave.com<br /><br />


            L’adresse e-mail mentionnée ci-dessus peut également être utilisée pour nous contacter au sujet de questions relatives au règlement sur les services numériques. Les communications à cette adresse peuvent se faire dans n’importe quelle langue européenne.
            Règlement des litiges La Plateforme de règlement en ligne des litiges de la Commission européenne est disponible à l’adresse http://ec.europa.eu/odr. Vous pouvez également contacter un organisme certifié de règlement extrajudiciaire des litiges pour aider à résoudre les litiges avec nous concernant nos actions en matière de traitement des contenus illicites signalés. Les décisions des organismes de règlement extrajudiciaire des litiges ne sont contraignantes ni pour vous ni pour nous.<br /><br />
            Représentant légal pour le règlement sur les services numériques
            Le représentant légal de chez Gustave, L.P. aux fins de l’article 13 du règlement sur les services numériques est :
            EG Vacation Rentals Ireland Ltd
            25 St Stephen’s Green, 4th floor
            Dublin 2, D02 XF99
            Irlande
        </p>
    </div>
    <Footer />
    </>
)


}