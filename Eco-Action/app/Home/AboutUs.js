const food = "/images/food.svg";

export function AboutUs(){


    return(
        <section className="my-24 mb-10 bg-white dark:bg-gray-900">
            <div className="items-center max-w-screen-xl gap-16 px-4 py-8 mx-auto lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-[#116A7B] dark:text-white">
                Transform Food Waste into Green Gold
                </h2>
                <p className="mb-4">
                Our platform empowers individuals and communities to take actionable steps towards a sustainable future by reducing food waste. Through interactive challenges, users learn to repurpose excess food into valuable compost, turning what was once waste into nourishment for the earth. By participating in these challenges, individuals not only minimize their environmental footprint but also contribute to a global movement of conscious consumption.
                </p>
                <p>
                Together, we can transform habits, reduce waste, and build a more sustainable world—one challenge at a time. </p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-8">
                <img
                    className="object-fill w-full rounded-lg h-[30rem] "
                    src={food}
                    alt="office content 1"
                />
                <img
                    className="object-fill w-full h-40 mt-4 rounded-lg lg:mt-10"
                    src="https://i5tiyar.com/wp-content/uploads/2024/01/187-030339-arab-environment-day-2022_700x400.jpg"
                    alt="office content 2"
                />
                </div>
            </div>
        </section>

    )
}