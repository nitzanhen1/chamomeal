import {Image, Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import COLORS from "../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";

const FullRecipeCard = ({visibleFullRecipe, handleCloseFull, recipe}) => {
    return (
        <Modal
            transparent
            visible={visibleFullRecipe}
            onRequestClose={handleCloseFull}
            animationType="slide">
            <View style={styles.modalBackGround}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity onPress={handleCloseFull}>
                        <Text>X</Text>
                    </TouchableOpacity>
                    <Image source={{uri: recipe.image}} style={{height: 80, width: 80}}/>
                    <View style={styles.card}>
                        <Text style={{fontWeight: 'bold', fontSize: 16}}>{recipe.name}</Text>
                        <Text style={{fontSize: 14, color: COLORS.grey}}>{recipe.calories}</Text>
                        <Text style={{fontSize: 17, fontWeight: 'bold'}}><Icon name="filter-vintage" size={17}/>{recipe.flowers} פרחים</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{flex: 1,}}>{recipe.ingredients_count}</Text>
                            <Text style={{flex: 1,}}>מרכיבים</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{flex: 1,}}>{recipe.preparation_time}</Text>
                            <Text style={{flex: 1,}}>זמן הכנה</Text>
                            <Text style={{flex: 1,}}>{recipe.total_time}</Text>
                            <Text style={{flex: 1,}}>זמן כולל</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{flex: 1,}}>{recipe.difficulty}</Text>
                            <Text style={{flex: 1,}}>רמת קושי</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{flex: 1,}}>{recipe.kosher}</Text>
                            <Text style={{flex: 1,}}>כשר</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{flex: 1,}}>{recipe.vegetarian}</Text>
                            <Text style={{flex: 1,}}>צמחוני</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{flex: 1,}}>{recipe.vegan}</Text>
                            <Text style={{flex: 1,}}>טבעוני</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{flex: 1,}}>{recipe.gluten_free}</Text>
                            <Text style={{flex: 1,}}>ללא גלוטן</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{flex: 1,}}>{recipe.without_lactose}</Text>
                            <Text style={{flex: 1,}}>ללא לקטוז</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackGround: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignrecipes: 'center',
    },
    modalContainer: {
        width: '95%',
        height: '95%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20,
    },
    card: {
        height: 100,
        marginLeft: 10,
        paddingVertical: 20,
        right: 0,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
});

export default FullRecipeCard