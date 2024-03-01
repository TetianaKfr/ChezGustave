import React from 'react';
import { Navbar } from '../../components/Navbar/Navbar';
import { Footer } from '../../components/Footer/Footer';

import lakeImg from '../../assets/PresentationLake.jpg';
import cliffs from '../../assets/PresentationCliffs.jpg';

// Founders images
import gustaveMaurice from '../../assets/GustaveMaurice.png';
import jeanMarlin from '../../assets/JeanMarlin.png';
import marcLavie from '../../assets/MarcLavie.png';
import paulAlker from '../../assets/PaulAlker.png';
import martinCraie from '../../assets/MartinCraie.png';

// Icons
import handIcon from '../../assets/HandsIcon.png';
import medalIcon from '../../assets/MedalIcon.png';
import lightBulbIcon from '../../assets/LightBulbIcon.png';
import teamIcon from '../../assets/TeamIcon.png';
import customerServiceIcon from '../../assets/CustomerServiceIcon.png';


export const Presentation= () => {
    return (
        <>
            <Navbar/>
            <h1>Présentation</h1>
            <div>
                <p>
                    Bienvenue sur le site Chez Gustave où vous entrez dans une ère nouvelle de la location de luxe, où chaque interaction est conçue pour vous, par des experts dévoués à votre satisfaction.
                </p>
            </div>
            <img id='presentation-lake-img' src={lakeImg} alt="image montrant un lac" />
            <h2>Nos Fondateurs</h2>
            <div>
                <div>
                    <img id='gustave-maurice-img' src={gustaveMaurice} alt="image de Gustave Maurice" />
                </div>
                <div>
                    <h3>Gustave Maurice</h3>
                    <p>
                        Ancien prospecteur immobilier pour AirBtoB, Gustave a parcouru le globe, découvrant des biens d'une rare beauté et d'une valeur inestimable. Riche de ces expériences, il choisit de changer de cap. Gustave est un visionnaire, il croit fermement en la valeur de la relation directe et personnalisée avec ses clients.
                    </p>
                </div>
            </div>
            <div>
                <div>
                    <img id='jean-marlin-img' src={jeanMarlin} alt="image de Jean Marlin" />
                </div>
                <div>
                    <h3>Jean Marlin</h3>
                    <p>
                        Jean est l'expert financier du groupe. Ayant travaillé dans plusieurs grandes banques, il apporte une solide connaissance en gestion financière et en investissement. C'est lui qui a conçu le modèle économique unique de l'entreprise, permettant un partage juste des bénéfices avec les propriétaires.
                    </p>
                </div>
            </div>
            <div>
            <div>
                <div>
                    <img id='marc-lavie-img' src={marcLavie} alt="image de Marc Lavie" />
                </div>
                <div>
                    <h3>Marc Lavie</h3>
                    <p>
                        Marc est le stratège marketing du groupe. Avec une carrière dans le marketing pour des marques de luxe, Marc comprend l'importance d'une communication ciblée et personnalisée. Il est l'artisan des stratégies de marketing direct et de bouche à oreille qui ont fait le succès de l'entreprise. Marc est également un amateur de gastronomie, ce qui l'a poussé à initier des partenariats avec des chefs étoilés pour offrir des expériences culinaires uniques aux clients.
                    </p>
                </div>
            </div>
                <div>
                    <img id='paul-alker-img' src={paulAlker} alt="image de Paul Alker" />
                </div>
                <div>
                    <h3>Paul Alker</h3>
                    <p>
                        Paul est l'expert en relation client de l'équipe. Avec une longue expérience dans la vente et le service client, notamment dans l'industrie du luxe, Paul est convaincu que la qualité de la relation est primordiale. Il est souvent le premier point de contact pour les nouveaux clients et s'assure que chaque interaction reflète les valeurs de l'entreprise. Passionné par les voyages, Paul a une compréhension profonde des attentes des clients haut de gamme et travaille sans relâche pour dépasser ces attentes.
                    </p>
                </div>
            </div>
            <div>
                <div>
                    <img id='martin-craie-img' src={martinCraie} alt="image de Martin Craie" />
                </div>
                <div>
                    <h3>Martin Craie</h3>
                    <p>
                        Martin est l'architecte intérieur de l'équipe. Avec un sens aigu du détail et une passion pour la beauté, il s'assure que chaque propriété est non seulement luxueuse mais aussi chaleureuse et accueillante. Avant de rejoindre l'aventure, Martin a dirigé sa propre agence de design, travaillant sur des projets d'hôtels de luxe et des résidences privées dans le monde entier. Il croit que chaque espace doit raconter une histoire et s'efforce de personnaliser chaque location pour qu'elle soit unique.
                    </p>
                </div>
            </div>
            <div>
                <div>
                    <img id='presentation-cliffs-img' src={cliffs} alt="image de falaise" />
                </div>
                <div>
                    <p>
                        Fondée sur la richesse de l'expérience de Gustave Maurice dans la prospection immobilière pour AirBtoB, une entreprise internationale de premier plan, notre société émerge d'un désir de renouveau. À l'aube de ses 50 ans, Gustave, accompagné de quatre amis passionnés, a choisi de quitter son parcours tracé pour se lancer dans une aventure audacieuse. Notre mission ? Proposer une sélection de biens d'exception à la location, en privilégiant une approche intime et directe avec nos clients. En optant pour un marketing direct, la mise en relation privée et le bouche à oreille, nous évitons les stratégies de communication de masse pour favoriser les échanges authentiques.

                        Nous offrons deux modèles distincts de collaboration : l'achat direct et un mandat d'exclusivité pour la gestion locative, rétribuant nos services à hauteur de 20% des revenus locatifs, avec un bonus d'intéressement annuel pour les propriétaires qui dépassent les 20 semaines de location. Notre objectif est clair : établir une relation de confiance pérenne avec nos clients pour la gestion de leurs biens.

                        Notre site se veut être une carte de visite numérique, exclusive et personnalisée, accessible uniquement sur parrainage, garantissant ainsi une expérience privilégiée et sécurisée. Chaque nouvel utilisateur doit être coopté par un membre existant, renforçant le caractère intime de notre réseau. Cette plateforme permet non seulement de découvrir nos biens d'exception mais aussi de faciliter le contact direct avec les associés, en mettant en avant notre différence : des locations haute de gamme à des prix compétitifs, des partenariats avec des chefs étoilés, des visites personnalisées et une gestion sur-mesure des séjours.
                    </p>
                </div>
            </div>
            <h2>Nos Valeurs</h2>
            <div>
                <h2>Confiance et Intégrité</h2>
                <img id='hands-icon-img' src={handIcon} alt="icone représentant une poignée de mains" />
                <p>
                    Au cœur de notre entreprise se trouve la conviction que la confiance et l'intégrité sont primordiales. Nous nous engageons à établir des relations transparentes et honnêtes tant avec nos clients qu'avec nos partenaires. Chaque interaction est guidée par le respect mutuel et le désir de créer des liens durables, basés sur la confiance et la fiabilité. Notre approche directe et personnelle assure que chaque client se sente écouté, compris et valorisé.
                </p>
            </div>
            <div>
                <h2>Excellence et Qualité</h2>
                <img id='hands-icon-img' src={medalIcon} alt="icone représentant une médaille" />
                <p>
                    Nous poursuivons sans relâche l'excellence dans tout ce que nous faisons. De la sélection minutieuse de nos biens d'exception à la qualité irréprochable de notre service, nous nous engageons à surpasser les attentes. Chaque propriété est choisie pour son caractère unique et son luxe inégalé, garantissant ainsi une expérience mémorable et raffinée. Notre dévouement à l'excellence se reflète également dans notre attention aux détails et notre quête constante d'amélioration.
                </p>
            </div>
            <div>
                <h2>Innovation et Personnalisation</h2>
                <img id='hands-icon-img' src={lightBulbIcon} alt="icone représentant une ampoule" />
                <p>
                    L'innovation est au cœur de notre stratégie pour offrir des expériences personnalisées et mémorables. Nous embrassons la technologie pour améliorer notre service, tout en maintenant l'importance de la touche humaine. Notre approche sur mesure de la location nous permet de répondre aux besoins spécifiques de chaque client, offrant des séjours qui vont bien au-delà des attentes standardisées. Nous sommes constamment à la recherche de nouvelles façons de surprendre et de ravir nos clients, en personnalisant leur expérience à chaque étape.
                </p>
            </div>
            <div>
                <h2>Responsabilité et Partage</h2>
                <img id='hands-icon-img' src={teamIcon} alt="icone représentant une ampoule" />
                <p>
                    Nous croyons en la responsabilité de contribuer positivement à notre communauté et à notre environnement. Cela se traduit par des pratiques éthiques dans la gestion de nos propriétés et un engagement envers le partage équitable des bénéfices avec nos propriétaires. Nous valorisons la durabilité et nous efforçons de minimiser notre empreinte écologique, en adoptant des pratiques respectueuses de l'environnement dans toutes nos opérations. Le partage des succès, tant avec nos propriétaires qu'avec nos employés, reflète notre conviction que le succès est plus significatif quand il est partagé.
                </p>
            </div>
            <div>
                <h2>Engagement envers l'Excellence du Service</h2>
                <img id='hands-icon-img' src={customerServiceIcon} alt="icone représentant une ampoule" />
                <p>
                    Notre engagement envers l'excellence du service est inébranlable. Nous comprenons que nos clients recherchent non seulement des biens d'exception, mais aussi un service qui dépasse leurs attentes. De la gestion personnalisée des réservations à l'organisation de visites personnalisées et d'expériences uniques, nous nous engageons à fournir un niveau de service qui distingue notre entreprise. Nos associés sont dédiés à offrir une attention et une expertise inégalées, assurant ainsi que chaque séjour soit impeccable et inoubliable.
                </p>
            </div>
            <Footer />
        </>
    )
}