import React, { useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Keyboard, Alert} from 'react-native';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckBox } from 'react-native-elements';
import styles from './styles/style';

export default function App(){

  const [task, setTask] = useState([]); //lista de tarefas
  const [newTask, setNewTask] = useState(''); //input
  const [selectedTasks, setSelectedTasks] = useState({}); // estado para rastrear tarefas selecionadas
  
  const toggleTaskSelection = (itemId) => {
    setTask((prevTasks) =>
        prevTasks.map((task) => task.id === itemId ? {...task, isSelected: !task.isSelected} : task  
      )
    );
  };
  
  const addTask = () => {
    if(newTask === ''){
      return;
    }

    const search = task.filter(task => task.text === newTask);
    if(search.length !== 0) {
      Alert.alert("Atenção", "Tarefa já adicionada")
      return;
    }

    setTask([...task, { id: Date.now(), text: newTask, isSelected: false }]);
    setNewTask('');
  
    Keyboard.dismiss();
  }

  const removeTask = (item) => {
    Alert.alert(
      "Deletar Tarefa",
      "Tem certeza que deseja remover esta tarefa?",
      [
        {
          text: "Cancelar",
          onPress: () => {
            return;
          },
          style: 'cancel',
        },
        {
          text: "Ok",
          onPress: () => setTask(task.filter(task => task.id !== item.id))
        }
      ],
      { cancelable: false}
    )
  
  }

  const updateTask = (item) => {
    Alert.prompt(
      'Editar Tarefa',
      'Digite o novo nome da tarefa:',
      [
        {
          text: 'Cancelar',
          onPress: () => {
            return;
          },
          style: 'cancel',
        },
        {
          text: 'Salvar',
          onPress: (newText) => {
            if (newText && newText.trim() !== '') {
              setTask((prevTasks) => prevTasks.map((task) => task.id === item.id ? { ...task, text: newText } : task));
            }
          },
        },
      ],
      'plain-text', //campo de texto simples
      item.text // o valor atual da tarefa que aparecerá no campo de texto
    );
  };

  //carregar as tarefas anteriores ao reiniciar o app
  useEffect(() => {
    async function loadingData() {
      const task = await AsyncStorage.getItem("task");

      if(task) {
        setTask(JSON.parse(task));
      }
    }
    loadingData();
  }, [])

  //salvar as tarefas no storage do celular
  useEffect(() => {
    async function saveData() {
      AsyncStorage.setItem("task", JSON.stringify(task))
    }
    saveData();
  }, [task]) 


  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerText}>to.do</Text>
      </View> 

      <View style={styles.body}>

        <FlatList 
        style={styles.flatList}
        data={task}
        keyExtractor={(item) => item.id.toString()} //espécie de ID para identificar o item
        showsVerticalScrollIndicator={true}

        renderItem={({ item }) => (
          <View style ={styles.listItems}>

            <CheckBox
              checked={item.isSelected}
              onPress={() => toggleTaskSelection(item.id)}
              checkedColor='green'
              checkedIcon="check"
            />

            <Text>{item.text}</Text> 

            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={() => updateTask(item)}>
                <Entypo name="pencil" size={20} color="black" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => removeTask(item)}>
                <MaterialIcons name="delete-forever" size={20} color="black" marginLeft={20} />
              </TouchableOpacity>
            </View>
            
          </View>
        )} 

        /> 

      </View>


      <View style={styles.inputContainer}>
          <TextInput
            value={newTask}
            style={styles.input}
            placeholder="Adicionar nova tarefa"
            autoCorrect={true}
            maxLength={30}
            onChangeText={text => setNewTask(text)}
          />
          <TouchableOpacity style={styles.button} onPress={() => addTask()}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      

    </View>
  );
}
