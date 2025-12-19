import { redirect } from "next/navigation";
import { getAccountData } from "./actions";
import AccountClientPage from "./client-page";

export default async function AccountPage() {
  try {
    const data = await getAccountData();
    
    return (
      <AccountClientPage 
        initialUser={data.user} 
        initialIntelligence={data.intelligence}
        initialPrivacy={data.privacy}
      />
    );
  } catch (error) {
    // REMOVIDO: console.error desnecessário que causava erro de Source Map no Turbopack.
    // Se falhar (ex: token expirado), apenas redireciona para login.
    redirect("/login");
  }
}