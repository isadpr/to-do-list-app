import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFEEF0',
      },
    
      header: {
        backgroundColor: '#835EED',
        padding: 30,
        justifyContent: 'center',
      },
    
      headerText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
      },
    
      inputContainer: {
        position: 'absolute',
        backgroundColor: '#fff',
        padding: 15,
        width: 300,
        borderRadius: 10,
        marginTop: 70,
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: 'gray',
      },
    
      button: {
        position:'absolute',
        marginLeft: 250,
        backgroundColor: '#EFEEF0',
        borderRadius: 25,
        width: 25, 
        height: 25, 
        alignItems: 'center',
        justifyContent: 'center',
      },
    
      buttonText: {
        fontWeight:'bold',
        color: '#835EED',
      },
    
      body: {
        flex:1,
        padding: 15,
      },
    
      flatList: {
        flex: 1,
        marginTop: 20,
      },
    
      listItems: {
        backgroundColor:'#D8D8D8',
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        display:'flex',
        marginTop: 20,
        borderRadius: 9,
      },

      buttonsContainer: {
        flexDirection: 'row',
        position:'absolute',
        marginLeft: 300,
      }
      
});

export default styles;