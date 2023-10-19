import * as React from 'react';
import {StyleSheet, TextInput, Keyboard} from 'react-native';
import {View} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from 'config/colors';
//import styles from '../../assets/MyStyles';

interface PropsBar {
  clicked: boolean;
  searchPhrase: string;
  searchAction: Function;
  onFocusAction: Function;
}
const SearchBar = (props: PropsBar) => {
  return (
    <View style={styles.container}>
      {props.clicked && (
        <View>
          <Ionicons
            style={styles.button}
            onPress={() => {
              Keyboard.dismiss();
              props.onFocusAction(false);
            }}
            name="chevron-back"
            size={24}
          />
        </View>
      )}
      <View
        style={[
          styles.searchBar,
          props.clicked
            ? styles.searchBar__clicked
            : styles.searchBar__unclicked,
        ]}>
        <Ionicons name="search" style={{marginLeft: 1}} size={20} />
        <TextInput
          style={styles.input}
          value={props.searchPhrase}
          onChangeText={(value: string) => {
            props.searchAction(value);
          }}
          placeholder="Cari Kelas"
          onFocus={() => {
            props.onFocusAction(true);
          }}
        />
      </View>
    </View>
  );
};

export default SearchBar;
const styles = StyleSheet.create({
  button: {
    marginHorizontal: 15,
  },
  container: {
    padding: 10,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.bgGrey100,
  },
  searchBar: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    flexDirection: 'row',
    borderColor: '#D0D5DD',
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  searchBar__unclicked: {
    backgroundColor: '#fff',
  },
  searchBar__clicked: {
    width: '86%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  input: {
    fontSize: 15,
    marginLeft: 5,
    width: '90%',
  },
});
