import React from 'react';
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
    const [httpError, setHttpError] = React.useState();
    const [isLoading, setIsLoading] = React.useState(false);
    const [meals, setMeals] = React.useState([]);
    React.useEffect(() => {
        const fetchMeals = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('https://react-food-order-app-7ea76-default-rtdb.firebaseio.com/meals.json');
                if (!response.ok) {
                    throw new Error('Something went wrong...!');
                }
                const data = await response.json();
                const fetchedMeals = [];
                for (const key in data) {
                    fetchedMeals.push({
                        id: key,
                        name: data[key].name,
                        description: data[key].description,
                        price: data[key].price
                    });
                }
                setMeals(fetchedMeals);
                setIsLoading(false);
            } catch (err){
                setIsLoading(false);
                setHttpError(err.message);
            }
        };

        fetchMeals();
    }, []);

    if (httpError) {
        return (
            <section className={classes.error}>
                <h3>{httpError}</h3>
            </section>
        );
    }

    if (isLoading) {
        return (
            <section className={classes.MealsLoading}>
                <p>Loading...!</p>
            </section>
        );
    }

    const mealsList = meals.map(meal =>
        <MealItem
            id={meal.id}
            key={meal.id}
            price={meal.price}
            description={meal.description}
            name={meal.name}
        />
    );
    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;