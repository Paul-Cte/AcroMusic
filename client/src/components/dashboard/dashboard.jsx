import {Link} from "react-router-dom";

export default function Dashboard({deconnexion}) {

    return (
        <div className="flex flex-col justify-between h-screen w-fit border-r-2">
            <div className="flex flex-col">
                <Link className="p-[20px] border-b-1 flex-1" to="/admin/dashboard/new">Nouvel album</Link>
                <Link className="p-[20px] border-b-1 flex-1" to="/admin/dashboard/discographie">Discographie</Link>
                <Link className="p-[20px] border-b-1 flex-1" to="/admin/dashboard/compositeurs">Compositeurs</Link>
            </div>
            <Link onClick={deconnexion} className="p-[20px] border-t-1 w-max" to="/admin">Se déconnecter</Link>
        </div>
    )
}