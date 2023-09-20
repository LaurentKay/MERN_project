import { Input, NativeBaseProvider } from 'native-base';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Button, Text, View, Modal, Dimensions, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-ionicons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import RadioButtonRN from 'radio-buttons-react-native';
import { listProdsPerCat } from '../../Redux/Actions/searchActions';
import { Sorting, Getcategory, Getbrand, Getprice } from '../../Redux/Actions/saidFilter';
const rdata = [
    {
        label: 'Price: High to Low', value: 2
    },
    {
        label: 'Price: Low to High', value: 3
    },
    {
        label: 'Top Rated', value: 2
    },
    {
        label: 'Newest Arrivals', value: 1
    }
]
import CustomModal from '../../Shared/CustomeModal';
import { FilterProduct, CategoryList, GetBrandList, GetMinMaxPrice } from '../../Shared/Services';
import { connect, useDispatch } from 'react-redux';
import { colors } from 'react-native-elements';
import Slider from 'rn-range-slider';
import Thumb from '../../Shared/Thumb';
import Rail from '../../Shared/Rail';
import RailSelected from '../../Shared/RailSelected';
import Label from '../../Shared/Label';
import Notch from '../../Shared/Notch';
import EcqButton from '../../Shared/STyledComponents/EcqButton';
import ProductListH from './ProductListH';
import ProductCardH from './ProductCardH';
import { ADD_TO_CART } from '../../Redux/constants';
import ProductList from './ProductList';

var { height, width } = Dimensions.get('window');
const Item = (props) => {
    const { item } = props;
    const prod = { item: item };
    const url = `https://ecquatorial.com/public/images/${item.product_img_path}`;
    return (
        <TouchableOpacity onPress={() => props.navigation.navigate("Product Details", { item: prod })}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingBottom: 15 }}>
                <Image
                    style={styles.image}
                    resizeMode="contain"
                    source={{ uri: url }}
                />
                <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', width: 200 }}>
                    <Text>{item.product_name}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <Text style={styles.price}>R{item.product_price}</Text>
                        {item.discounted_price > 0 ?
                            <Text style={styles.priceSpecial}>R{item.discounted_price}</Text> :
                            null
                        }
                    </View>
                    <EcqButton
                        primary
                        medium
                        onPress={() => props.addtoCart({ product: item.product_Id, name: item.product_name, price: item.discounted_price > 0 ? item.discounted_price : item.product_price })
                        }
                    >
                        <FontAwesome5Icon name="shopping-cart" size={20} color="white" />
                        <Text style={{ color: 'white', fontSize: 16, paddingLeft: 8 }}>Add</Text>
                    </EcqButton>
                </View>

            </View>
        </TouchableOpacity>
    )
}
const SingleSubCategoryProducts = (props) => {
    let catar = [];
    let brndar = [];
    const txtRef = useRef(null);
    const [value, setValue] = useState("");
    const [focus, setFocus] = useState(false);
    const [catId, setCatId] = useState(props.route.params.catId);
    const [products, setData] = useState(props.products || []);
    const [productFilter, setProductFilter] = useState([]);
    const [sortBy, setSortBy] = useState();
    const [category, setCategory] = useState(props.filters.category);
    const [size, setSize] = useState([]);
    const [color, setColor] = useState([]);
    const [ratings, setRating] = useState();
    const [brand, setBrand] = useState(props.filters.brand);
    const [search, setSearch] = useState();
    const [sortOrder, setSortOrder] = useState();
    const [isModal, setIsModal] = useState(false);
    const [isModal1, setIsModal1] = useState(false);
    const [isModalCat, setIsModalCat] = useState(false);
    const [isModalBrand, setIsModalBrand] = useState(false);
    const [cat, setCat] = useState();
    const [brnd, setBrnd] = useState();

    const [low, setLow] = useState(0);
    const [high, setHigh] = useState(150000);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(150000);
    const [layout, setLayout] = useState('list');
    //Range variables
    const renderThumb = useCallback(() => <Thumb />, []);
    const renderRail = useCallback(() => <Rail />, []);
    const renderRailSelected = useCallback(() => <RailSelected />, []);
    const renderLabel = useCallback(value => <Label text={value} />, []);
    const renderNotch = useCallback(() => <Notch />, []);
    const handleValueChange = useCallback((low, high) => { setLow(low); setHigh(high); PriceFilter({ min: low, max: high }) }, []);

    const chooseCategory = (e) => {
        setCat(e.value);
    }
    const chooseBrand = (e) => {
        setBrnd(e.value);
    }
    const handleBrand = (brands) => {
        var index = brands.indexOf(brnd);
        if (index < 0) {
            brands.push(brnd);
        } else {
            brands.splice(index, 1);
        }
        props.Getbrand(brands);
    }
    const handleFilter = (arr, brands) => {
        //Categories
        var indexc = arr.indexOf(cat);
        if (indexc < 0) {
            arr.push(cat);
        }
        else {
            arr.splice(indexc, 1);
        }


        //Brands
        var indexb = brands.indexOf(brnd);
        if (indexb < 0) {
            brands.push(brnd);
        } else {
            brands.splice(indexb, 1);
        }

        if (cat && brnd) {
            props.Getcategory(arr);
            props.Getbrand(brands);
        } else if (cat && !brnd) {
            props.Getcategory(arr);
        } else if (!cat && brnd) {
            props.Getbrand(brands);
        }
    }
    const closeOnClickOutside = false;
    const handleSort = (e) => {
        setSortBy(e.value);
    }
    const handleApply = () => {
        props.Sorting(sortBy);
        //setProductFilter(FilterProduct(sdata, filter));
    }
    if (props.products.length > 0) {
        // console.log('The Category ', props.categorys);  
        for (var ic = 0; ic < props.products.length; ic++) {
            const ct = catar.find(c => c.label === props.products[ic].category[0]);
            const bd = brndar.find(b => b.label === props.products[ic].brands[0]);
            if (!ct) {
                let categ = {
                    label: props.products[ic].category[0], value: props.products[ic].category[0]
                };
                catar.push(categ);
            }
            if (!bd) {
                let bde = {
                    label: props.products[ic].brands[0], value: props.products[ic].brands[0]
                };
                brndar.push(bde);
            }
        }
    }

    const PriceFilter = values => {
        var maximumval = props.prices.max / 5;
        console.log('maximumval ===> ', maximumval, ' ===<> ', props.prices.max);
        var value = {
            min: values.min,
            max: values.max
        }
        if (value.min == 0) {
            value.min = 0;
        }
        else if (value.min > 0 && value.min <= 20) {
            value.min = parseInt(fncl(value.min * (maximumval * 1) / 20));
        }
        else if (value.min > 20 && value.min <= 40) {
            value.min = parseInt(fncl(value.min * (maximumval * 2) / 40));
        }
        else if (value.min > 40 && value.min <= 60) {
            value.min = parseInt(fncl(value.min * (maximumval * 3) / 60));
        }
        else if (value.min > 60 && value.min <= 80) {
            value.min = parseInt(fncl(value.min * (maximumval * 4) / 80));
        }
        else if (value.min > 80 && value.min <= 100) {
            value.min = parseInt(fncl(value.min * (maximumval * 5) / 100));
        }
        else {
            value.min = false;
        }

        if (value.max === 0) {
            value.max = 0;
        }
        else if (value.max > 0 && value.max <= 200000) {
            value.max = parseInt(fncl(value.max * (maximumval * 1) / 200000));
        }
        else if (value.max > 200000 && value.max <= 400000) {
            value.max = parseInt(fncl(value.max * (maximumval * 2) / 400000));
        }
        else if (value.max > 400000 && value.max <= 600000) {
            value.max = parseInt(fncl(value.max * (maximumval * 3) / 600000));
        }
        else if (value.max > 600000 && value.max <= 800000) {
            value.max = parseInt(fncl(value.max * (maximumval * 4) / 800000));
        }
        else if (value.max > 800000 && value.max <= 1000000) {
            value.max = parseInt(fncl(value.max * (maximumval * 5) / 1000000));
        }
        else {
            value.max = false;
        }
        // this.setState({
        //     priceplace: values
        // });
        props.Getprice({ value })
    }
    const fncl = (value) => {
        return Number.parseFloat(value).toFixed(0);
    }
    const dispatch = useDispatch();
    const addToCart = (product) => {
        console.log("Obj to send::: ", product);
        Object.assign(product, { qty: 1 });
        dispatch({ type: ADD_TO_CART, payload: product });
        Toast.show({
            topOffset: 60,
            type: "success",
            text1: `${product.name} added to Cart`,
            text2: "Go to your cart to complete order"
        });
    }
    const changeLayout = () => {
        if (layout === 'list') {
            setLayout('grid');
        } else if (layout === 'grid') {
            setLayout('list');
        }
    }
    useEffect(() => {
        props.listProdsPerCat(catId);
        //txtRef.current.focus(true);
        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: "none" } });
        return () => props.navigation.getParent()?.setOptions({ tabBarStyle: undefined });
    }, []);
    return (
        <NativeBaseProvider>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, width: '100%' }}>
                    <Text>{props.products.length} of Items</Text>
                    <View><FontAwesome5Icon name="th-list" size={25} onPress={() => changeLayout()} color="black" /></View>
                    <View><Text onPress={() => setIsModal(true)}>SORT</Text></View>
                    <View><Text onPress={() => setIsModal1(true)}>FILTER</Text></View>
                </View>
                {layout === 'list' ?
                    <FlatList
                        data={props.products}

                        //inverted
                        numColumns={2}
                        renderItem={(item, index) => (
                            <ProductList
                                navigation={props.navigation}
                                key={index}
                                item={item}
                            />
                        )}
                    />
                    :
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ width: '100%', backgroundColor: 'white' }}>
                            {props.products.map((p, index) => (
                                <ProductListH
                                    navigation={props.navigation}
                                    key={index}
                                    item={p}
                                />

                            ))}
                        </View>
                    </ScrollView>
                    // <FlatList
                    //     data={props.products}
                    //     renderItem={({ item, index }) => (
                    //         <Item
                    //             navigation={props.navigation}
                    //             key={index}
                    //             item={item}
                    //             addtoCart={addToCart}
                    //         />
                    //     )}
                    // />
                }
            </View>
            <CustomModal
                animation="slide"
                visible={isModal}
                mode="overFullScreen"
                boxBackgroundColor="white"
                transparentContainer={false}
                bottomHalf={false}
                outsideClick={() => {
                    if (closeOnClickOutside) {
                        setIsModal(false);
                    }
                }}
            >
                <View style={styles.modalHeader}>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} onPress={() => setIsModal(false)}>
                        <Text>X</Text>
                        <Text style={styles.title}>Sort</Text>
                    </TouchableOpacity>
                    <View style={styles.divider}></View>
                </View>
                <View style={{ width: '100%', marginBottom: 8 }}>
                    <RadioButtonRN
                        data={rdata}
                        selectedBtn={(e) => [handleSort(e), console.log(e, '=>', e.value)]}
                        style={{ width: '100%' }}
                    />
                </View>
                <Button
                    title="Apply"
                    onPress={() => [handleApply(), setIsModal(false)]}
                />
            </CustomModal>

            <CustomModal
                animation="slide"
                visible={isModal1}
                mode="overFullScreen"
                boxBackgroundColor="white"
                transparentContainer={false}
                bottomHalf={false}
                outsideClick={() => {
                    if (closeOnClickOutside) {
                        setIsModal1(false);
                    }
                }}
            >
                <View style={styles.modalHeader}>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} onPress={() => setIsModal1(false)}>
                        <Text>X</Text>
                        <Text style={styles.title}>Filter</Text>
                    </TouchableOpacity>
                    <View style={styles.divider}></View>
                </View>
                <View style={{ width: '100%', marginBottom: 8 }}>
                    <TouchableOpacity onPress={() => setIsModalCat(true)}>
                        <View style={{ paddingHorizontal: 20, paddingBottom: 10, paddingTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                <Text style={{ fontSize: 16, width: '80%' }}>Categories</Text>
                                <FontAwesome5Icon name="arrow-right" size={20} color={colors.grey0} />
                            </View>
                        </View>
                        <View style={{ height: 1, backgroundColor: colors.grey0, marginLeft: 5, marginRight: 5 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsModalBrand(true)}>
                        <View style={{ paddingHorizontal: 20, paddingBottom: 10, paddingTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                <Text style={{ fontSize: 16, width: '80%' }}>Brands</Text>
                                <FontAwesome5Icon name="arrow-right" size={20} color={colors.grey0} />
                            </View>
                        </View>
                        <View style={{ height: 1, backgroundColor: colors.grey0, marginLeft: 5, marginRight: 5 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={{ paddingHorizontal: 20, paddingBottom: 10, paddingTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                <View style={styles.horizontalContainer}>
                                    <Text style={styles.valueText}>R {low}</Text>
                                    <Text style={styles.valueText}>R {high}</Text>
                                </View>
                                <Slider
                                    style={{ width: '100%' }}
                                    min={min}
                                    max={max}
                                    step={1}
                                    renderThumb={renderThumb}
                                    renderRail={renderRail}
                                    renderRailSelected={renderRailSelected}
                                    renderLabel={renderLabel}
                                    renderNotch={renderNotch}
                                    onValueChanged={handleValueChange}
                                />
                            </View>
                        </View>
                        <View style={{ height: 1, backgroundColor: colors.grey0, marginLeft: 5, marginRight: 5 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={{ paddingHorizontal: 20, paddingBottom: 10, paddingTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                <Text style={{ fontSize: 16, width: '80%' }}>Rating</Text>
                                <FontAwesome5Icon name="arrow-right" size={20} color={colors.grey0} />
                            </View>
                        </View>
                        <View style={{ height: 1, backgroundColor: colors.grey0, marginLeft: 5, marginRight: 5 }} />
                    </TouchableOpacity>
                </View>
                <Button
                    title="Filter"
                    onPress={() => [handleFilter(category, brand), setIsModal1(false)]}
                />
                <View style={{ height: 20 }} />
                <Button
                    title='Clear Filter'
                    onPress={() => [setCategory([]), props.Getcategory([]), props.Getbrand([]), setIsModal1(false)]}
                />
            </CustomModal>

            {/*Categories*/}
            <CustomModal
                animation="slide"
                visible={isModalCat}
                mode="overFullScreen"
                boxBackgroundColor="white"
                transparentContainer={false}
                bottomHalf={false}
                outsideClick={() => {
                    if (closeOnClickOutside) {
                        setIsModalCat(false);
                    }
                }}
            >
                <ScrollView>
                    <View style={styles.modalHeader}>
                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} onPress={() => setIsModalCat(false)}>
                            <Text>X</Text>
                            <Text style={styles.title}>Categories</Text>
                        </TouchableOpacity>
                        <View style={styles.divider}></View>
                    </View>
                    <View style={{ width: '100%', marginBottom: 8 }}>
                        <RadioButtonRN
                            data={catar}
                            selectedBtn={(e) => [chooseCategory(e), console.log(e, '=>', e.value)]}
                            style={{ width: '100%' }}
                        />
                    </View>
                    <Button
                        title="Apply"
                        onPress={() => [setIsModalCat(false)]}
                    />
                </ScrollView>
            </CustomModal>
            {/*Brands modal */}
            <CustomModal
                animation="slide"
                visible={isModalBrand}
                mode="overFullScreen"
                boxBackgroundColor="white"
                transparentContainer={false}
                bottomHalf={false}
                outsideClick={() => {
                    if (closeOnClickOutside) {
                        setIsModalBrand(false);
                    }
                }}
            >
                <ScrollView>
                    <View style={styles.modalHeader}>
                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} onPress={() => setIsModalBrand(false)}>
                            <Text>X</Text>
                            <Text style={styles.title}>Brands</Text>
                        </TouchableOpacity>
                        <View style={styles.divider}></View>
                    </View>
                    <View style={{ width: '100%', marginBottom: 8 }}>
                        <RadioButtonRN
                            data={brndar}
                            selectedBtn={(e) => [chooseBrand(e), console.log(e, '=>', e.value)]}
                            style={{ width: '100%' }}
                        />
                    </View>
                    <Button
                        title="Apply"
                        onPress={() => [setIsModalBrand(false)]}
                    />
                </ScrollView>
            </CustomModal>
        </NativeBaseProvider>

    );
};

const styles = StyleSheet.create({
    listContainer: {
        height: height,
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
    },
    modalHeader: {

    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        padding: 15,
        color: "#000"
    },
    divider: {
        width: "100%",
        height: 1,
        backgroundColor: "lightgray"
    },
    image: {
        width: width / 3 - 20 - 10,
        height: 100,
        backgroundColor: 'transparent',
        top: 2,
    },
    horizontalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        //marginTop: 20,
        width: '100%',
    },
    price: {
        fontSize: 14,
        color: 'black',
        marginTop: 10,
        fontWeight: 'bold'
    },
    priceSpecial: {
        fontSize: 16,
        color: 'orange',
        marginTop: 10,
        fontWeight: 'bold',
    }
});

const mapStateToProps = state => {
    return {
        categorys: CategoryList(state.productPerSub.products),
        brands: GetBrandList(state.productPerSub.products),
        prices: GetMinMaxPrice(state.productPerSub.products),
        products: FilterProduct(state.productPerSub, state.Filters),
        filters: state.Filters,
    }
};
const mapDispatchToProps = {
    listProdsPerCat,
    Sorting,
    Getcategory,
    Getbrand,
    Getprice,
}
export default connect(mapStateToProps, mapDispatchToProps)(SingleSubCategoryProducts);