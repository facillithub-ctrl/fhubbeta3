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
    console.error("Erro ao carregar conta:", error);
    redirect("/login");
  }
}