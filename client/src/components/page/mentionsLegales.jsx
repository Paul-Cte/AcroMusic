import {useEffect} from "react";

export default function MentionsLegales() {
    useEffect(() => {
        document.title = "AcroMusic | Mentions légales";
    }, []);
    return (
        <div className="pt-25 md:pt-[25vh] pb-20 flex flex-col items-center min-h-screen">
            <div className="w-[90%] max-w-4xl bg-white pt-0 p-8 md:pt-0 md:p-12 rounded-lg">
                <h1 className="text-4xl md:text-6xl font-black text-black uppercase tracking-tighter mb-10">
                    Mentions Légales
                </h1>

                <div className="flex flex-col gap-8 font-barlow text-gray-800 text-lg">

                    <section>
                        <h2 className="text-2xl font-bold mb-3 uppercase">1. Éditeur du site</h2>
                        <p>
                            Le présent site "AcroMusic" est édité par :<br />
                            <strong>Paul Comte</strong><br />
                            Email : <a href="paul.comte3878@gmail.com">paul.comte3878@gmail.com</a>
                            <br />

                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-3 uppercase">2. Hébergement</h2>
                        <p className="mb-4">
                            L'architecture du site est divisée en deux parties (Frontend et Backend) hébergées séparément :
                        </p>
                        <p className="mb-2">
                            <strong>Hébergement Frontend :</strong><br />
                            Vercel Inc.<br />
                            440 N Barranca Ave #4133<br />
                            Covina, CA 91723<br />
                            États-Unis<br />
                            Site web : https://vercel.com
                        </p>
                        <p>
                            <strong>Hébergement Backend (API et Base de données) :</strong><br />
                            ALWAYSDATA, SARL au capital de 5.000 €<br />
                            91 rue du Faubourg Saint Honoré<br />
                            75008 Paris<br />
                            France<br />
                            Site web : https://www.alwaysdata.com
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-3 uppercase">3. Propriété intellectuelle</h2>
                        <p>
                            L'ensemble de ce site relève des législations française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents iconographiques, les musiques, les covers d'albums et les photographies.
                            Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site est interdite, sauf autorisation écrite préalable de l'auteur.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-3 uppercase">4. Données personnelles et cookies</h2>
                        <p>
                            Le site "AcroMusic" a pour vocation la simple consultation d'informations. Il ne comporte aucun système de création de compte utilisateur, de formulaire de contact ou de newsletter.
                            Par conséquent, **aucune donnée personnelle n'est collectée, stockée ou traitée** lors de votre navigation.
                        </p>
                        <p className="mt-2">
                            De plus, ce site n'utilise aucun cookie de ciblage publicitaire ou de suivi d'audience nécessitant le recueil de votre consentement préalable.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
}