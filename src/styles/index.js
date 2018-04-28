import EStyleSheet from 'react-native-extended-stylesheet';

export const Color = {
  base: '#FFFA73',
  white: '#FFFFFF',
};

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 80,
  },
  buttonContainer: {
    margin: 20,
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 10,
  },
  buttonText: {
    padding: 20,
    color: 'black',
    fontSize: 20,
  },
  leftBarButtonContainer: {
    width: 60,
    alignItems: 'center',
  },
  rightBarButtonContainer: {
    width: 60,
    alignItems: 'center',
  },
  mainIndicator: {
    position: 'absolute',
    width: 50,
    height: 50,
    left: '50%',
    top: '50%',
  },
});
