import React from "react";
import { styles } from "../Styles/styles";

const LoggedOutPage = () => {
    return (
        <section className="h-screen max-w-5xl mx-auto p-5 my-10 ">
            <div className="border-[1.5px] border-screenColor2 p-20 ">
                <h1 className="text-2xl text-primaryColor font-eduoxusSans font-medium text-center">
                    Friends App
                </h1>
                <p className={`${styles.secondaryParaText} text-center pt-6`}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    In, omnis totam itaque asperiores quisquam cupiditate iusto
                    velit tempore ab ipsum molestiae, doloremque nobis eos.
                    Reprehenderit veritatis mollitia excepturi eos recusandae.
                </p>
            </div>
        </section>
    );
};

export default LoggedOutPage;
