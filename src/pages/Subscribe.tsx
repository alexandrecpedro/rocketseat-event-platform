// import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { useCreateSubscriberMutation } from "../graphql/generated";

// // Build a mutation
// const CREATE_SUBSCRIBER_MUTATION = gql`
//     mutation CreateSubscriber ($name: String!, $email: String!) {
//         createSubscriber(data: {name: $name, email: $email}) {
//             id
//         }
//     }
// `;

export function Subscribe() {
    // Redirect subscriber to event page (without clicking at any link/anchor) - part 1
    const navigate = useNavigate();

    // Creating states (immutability)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    // const [function(exeuteMutation), {getMutationResult}] = useMutation();
    // loading = boolean value (true = mutation is being done | false = is finished or hasn't even started yet)
    // const [createSubscriber, { loading }] = useMutation(CREATE_SUBSCRIBER_MUTATION);
    const [createSubscriber, { loading }] = useCreateSubscriberMutation();

    // This function will be called when an user clicks on form's button
    async function handleSubscribe(event: FormEvent) {
        event.preventDefault();

        // At GraphCMS, all data is created as Draft by default
        // It can be changed by adding a permission at GraphCMS API for a Subscriber to Read Draft files
        await createSubscriber({
            variables: {
                name,
                email
            }
        });

        // Redirect subscriber to event page (without clicking at any link/anchor) - part 2
        navigate('/event');
    }

    return (
        <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
            <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto">
                {/* Left part */}
                <div className="max-w-[640px]">
                    <Logo />

                    <h1 className="mt-8 text-[2.5rem] leading-tight">
                        Construa uma <strong className="text-blue-500">aplicação completa</strong>, do zero, com <strong className="text-blue-500">React JS</strong>
                    </h1>
                    <p className="mt-4 text-gray-200 leading-relaxed">
                        Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.
                    </p>
                </div>

                {/* Right part - Form */}
                <div className="p-8 bg-gray-700 border border-gray-500 rounded">
                    <strong className="text-2xl mb-6 block">Inscreva-se gratuitamente</strong>

                    <form onSubmit={handleSubscribe} className="flex flex-col gap-2 w-full">
                        <input
                            className="bg-gray-900 rounded px-5 h-14"
                            type="text"
                            placeholder="Seu nome completo"
                            // when user enters a new letter, it changes name state value
                            onChange={event => setName(event.target.value)}
                        />
                        <input
                            className="bg-gray-900 rounded px-5 h-14"
                            type="email"
                            placeholder="Digite seu email"
                            // when user enters a new letter, it changes email state value
                            onChange={event => setEmail(event.target.value)}
                        />

                        <button
                            className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
                            type="submit"
                            disabled={loading}
                        >
                            Garantir minha vaga
                        </button>
                    </form>
                </div>
            </div>

            <img src="/src/assets/code-mockup.png" className="mt-10" alt="" />
        </div>
    );
}