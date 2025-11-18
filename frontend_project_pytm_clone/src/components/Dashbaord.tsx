import { Appbar } from "../coms2/appBar";
import { Balance } from "../coms2/balance";
import { Users } from "../coms2/Users";

export function Dashboard()
{
    return <div>
        <Appbar></Appbar>
        <div>
            <Balance ></Balance>
            <Users></Users>
        </div>
    </div>
}