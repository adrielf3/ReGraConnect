import React, { useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type fabItens = {
  onPressOp1: any
}


const MyFAB = ( { onPressOp1 } : fabItens ) => {
    
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <View style={{ position: 'relative' }}>

      <TouchableOpacity style={{
            width: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: '#ee6e73',
            position: 'absolute',
            bottom: 50,
            right: 16,
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 5,
            }} onPress={toggleMenu}>
        <Icon name="close" size={24} color="#fff" />
      </TouchableOpacity>

      {showMenu && (
        <View style={{
            position: 'absolute',
            bottom: 150,
            right: 16,
            backgroundColor: 'rgba(237, 216, 157,0.5)',
            borderRadius: 5,
            paddingVertical: 8,
            paddingHorizontal: 16,
            }}>
          <TouchableOpacity onPress={onPressOp1} style={styles.option}>
            <Text style={styles.optionText}>Minhas Ações</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Opção 2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.optionText}>Opção 3</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = {
  option: {
    paddingVertical: 8,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
};

export default MyFAB;