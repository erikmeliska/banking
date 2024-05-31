import BankCard from "@/components/BankCard";
import HeaderBox from "@/components/HeaderBox";
import Image from "next/image";
import { getAccounts, getInstitution } from "@/lib/actions/bank.actions";
import { getInstitutions, getInstitutionLink } from "@/lib/actions/gocardless.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";
import { redirect } from "next/navigation";

const Banks = async () => {
    const institutions = await getInstitutions();
    console.log("institutions", institutions);
    // const loggedIn = await getLoggedInUser();

    const handleSubmit = async (formData: FormData) => {
        "use server"

        const institutionId = formData.get("institutionId");
        console.log("institutionId", institutionId);

        const link = await getInstitutionLink(institutionId as string);
        console.log("link", link);

        redirect(link.link);

    };

    return (
        <section className="flex">
            <div className="my-banks">
                <HeaderBox
                    title="Available banks"
                    subtext="Connect your bank accounts from any of the available banks."
                />

                <div className="space-y-4">
                    <h2 className="header-2">List of banks</h2>
                    <div className="flex flex-wrap gap-6">
                        {institutions && institutions.map((a: any) => (
                            <div key={a.id} className="rounded-md border-2 p-1 max-w-28">
                                <form action={handleSubmit} id={a.id}>
                                    <input type="hidden" name="institutionId" value={a.id} />
                                    <input
                                        type="image"
                                        src={a.logo}
                                        alt={a.name}
                                        width={100}
                                        height={100}
                                        style={{ cursor: 'pointer' }}
                                    />
                                    <div className="uppercase text-xs truncate">{a.name}</div>
                                </form>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banks;
