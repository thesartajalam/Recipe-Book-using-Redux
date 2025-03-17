import { useEffect, useLayoutEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { MEALS, CATEGORIES } from '../data/dummy-data';
import { useRoute } from '@react-navigation/native'; // alternative can be used for using route prop in 
// nested component which is not registered as screen
import MealItem from '../components/MealItem';

function MealsOverviewScreen({ route, navigation }) {
    // const route = useRoute();
    // const cattId= route.params.categoryId;
    const catId = route.params.categoryId;

    const displayedMeals = MEALS.filter((mealItem) => {
        return mealItem.categoryIds.indexOf(catId) >= 0;
    });

    function mealItemPressHandler({id}) { // this function is made to use in MealItem onPress prop if we want to navigate through the use of this screen
        navigation.navigate('MealDetail', {
            mealId: id
        });
    }

    // useEffect(() => {
    // Do work same as useEffect, but is helpful in cases where you want your effect to render or invoke before the component function in rendered
    useLayoutEffect(() => { // can use this hook instead of useEffect for smooth transition when navigating
        const categoryTitle = CATEGORIES.find((category) => category.id === catId).title;
    
        navigation.setOptions({
            title: categoryTitle,
        });
    }, [ catId, navigation]);

    
    
    function renderMealItem(itemData) {
        const item = itemData.item;
        
        const mealItemProps = {
            id: item.id,
            title: item.title,
            imageUrl: item.imageUrl,
            duration: item.duration,
            complexity: item.complexity,
            affordability: item.affordability,
        };
        
        return <MealItem {...mealItemProps} />;
        // return <MealItem {...mealItemProps} onPress={mealItemPressHandler}/>; 
        // if we want to navigate through from this screen, but don't forget to set the onPress prop 
        // on MealItem component and on it's pressable
    }



    return (
    <View styles={styles.container}>
        <FlatList data={displayedMeals} keyExtractor={(item) => item.id} renderItem={renderMealItem}/>
    </View>
    );
}

export default MealsOverviewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    }
});