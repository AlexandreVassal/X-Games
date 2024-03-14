
import { Text, ScrollView, TouchableOpacity } from 'react-native';

export default function MenuItems() {
    return (
      <ScrollView>
        <TouchableOpacity onPress={() => { /* Action */ }}>
          <Text>Item 1</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { /* Action */ }}>
          <Text>Item 2</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };