import { Navbar } from '../../components/Navbar/Navbar';
import { Footer } from '../../components/Footer/Footer';

import "./CGU.css"

export const CGU = () => {



    return(
        <>
        <Navbar />
        <div className="div-CGU">
            <h1 id="title-CGU">Conditions Générales d'Utilisations</h1>
        </div>
        <div className="div-CGU">
            <p id="paragraph-CGU">
            Bienvenue sur le site chez Gustave, le service de location de biens immobiliers de luxe. En accédant à notre site web et en utilisant nos services, vous acceptez les termes et conditions énoncés dans ce document. Si vous n'êtes pas d'accord avec ces conditions, veuillez ne pas utiliser notre site ni nos services.<br /><br />

            Utilisation du Service chez Gustave offre un service de location de biens immobiliers de luxe à travers un modèle basé sur la confiance et l'exclusivité. L'accès au service est possible uniquement sur invitation et chaque utilisateur s'engage à respecter la confidentialité et l'exclusivité de notre offre.<br /><br />

            Compte Utilisateur Pour accéder à certains services, vous devrez créer un compte. Vous êtes responsable de la sécurité de votre compte et de son utilisation. Toute activité sous votre compte sera considérée comme effectuée par vous.<br /><br />

            Propriété Intellectuelle Tous les contenus présents sur le site, y compris les textes, images, designs et logos, sont la propriété exclusive de chez Gustave ou de ses partenaires. Toute utilisation non autorisée est strictement interdite.<br /><br />

            5. Confidentialité chez Gustave s'engage à protéger la confidentialité de ses utilisateurs conformément à sa politique de confidentialité. Les données personnelles seront traitées avec le plus grand soin et ne seront pas partagées sans consentement.<br /><br />

            Limitation de Responsabilité chez Gustave s'efforce d'assurer la précision et la fiabilité des informations fournies mais ne peut garantir l'absence totale d'erreurs ou d'interruptions de service.<br /><br />

            Modifications des CGU chez Gustave se réserve le droit de modifier ces CGU à tout moment. Les utilisateurs seront informés de toute modification substantielle.<br /><br />

            Loi Applicable et Juridiction Ces CGU sont régies par la loi française. Tout litige relatif à leur interprétation ou exécution relèvera de la compétence exclusive des tribunaux français.<br /><br />

            Contact Pour toute question relative à ces CGU, veuillez nous contacter à service@chezgustave.com.<br /><br />
            </p>
        </div>
        <Footer />
        </>
    )
}