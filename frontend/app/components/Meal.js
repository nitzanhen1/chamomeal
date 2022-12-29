import React from 'react';
import {StyleSheet, View, Text, Image, Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';
import FullRecipeCard from "./FullRecipeCard";


const CartCard = ({item}) => {
    const [visibleFullRecipe, setFullVisible] = React.useState(false);

    const handleOpenFull = () => {
        setFullVisible(true);
    }

    const handleCloseFull = () => {
        setFullVisible(false);
    }
    return (
        <View style={styles.cartCard}>
            <Button onPress={handleOpenFull} title="Full" />
            {visibleFullRecipe && <FullRecipeCard visibleFullRecipe={visibleFullRecipe} handleCloseFull={handleCloseFull} recipe={item}/>}
            <Image source={item.image} style={{height: 80, width: 80}} />
            <View style={styles.card}>
                <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.name}</Text>
                <Text style={{fontSize: 14, color: COLORS.grey}}>{item.calories}</Text>
                <Text style={{fontSize: 17, fontWeight: 'bold'}}><Icon name="filter-vintage" size={17}/>{item.flowers} פרחים</Text>
            </View>
            {/*<View style={{marginRight: 20, alignItems: 'center'}}>*/}
            {/*    <Text style={{fontWeight: 'bold', fontSize: 18}}>3</Text>*/}
            {/*    <View style={style.actionBtn}>*/}
            {/*        <Icon name="remove" size={25} color={COLORS.white} />*/}
            {/*        <Icon name="add" size={25} color={COLORS.white} />*/}
            {/*    </View>*/}
            {/*</View>*/}
        </View>
    );
};
const styles = StyleSheet.create({
    cartCard: {
        flex:1,
        height: 100,
        elevation: 15,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        direction: 'rtl',
        alignItems: 'center',
    },
    card:{
        height: 100,
        marginLeft: 10,
        paddingVertical: 20,
        right: 0,
        // flex: 1,
    },
    actionBtn: {
        width: 80,
        height: 30,
        backgroundColor: COLORS.primary,
        borderRadius: 30,
        paddingHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
});

export default CartCard;