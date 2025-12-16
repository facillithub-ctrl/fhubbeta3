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
      />
    );
  } catch (error) {
    // Se falhar o carregamento (ex: sessão expirada), manda pro login
    redirect("/login");
  }
}