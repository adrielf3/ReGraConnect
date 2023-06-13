import moment from 'moment'
import BcryptReactNative from 'bcrypt-react-native'

export async function hashApi() {
  const pass = moment().format('DDMMYYYY');
  const salt = await BcryptReactNative.getSalt(10);
  const hash = await BcryptReactNative.hash(salt, pass + 'apr');
  return hash;
}