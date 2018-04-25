import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    height: 44,
    '@media ios': {
      marginTop: 20,
    },
  },
  rightButton: {
    alignSelf: 'flex-end',
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  leftButton: {
    alignSelf: 'flex-start',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    alignSelf: 'center',
    paddingVertical: 20,
  },
  icon: {
    width: 18,
  },
});
