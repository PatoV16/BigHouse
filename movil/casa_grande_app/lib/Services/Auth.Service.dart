import 'package:firebase_auth/firebase_auth.dart';
import '../Models/UserModel.dart';
import 'Usuario.server.dart';

class AuthService {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final UserService _userService = UserService();

  // Obtener el usuario actual
  User? get currentUser => _auth.currentUser;

  // Stream de cambios de estado de autenticación
  Stream<User?> get authStateChanges => _auth.authStateChanges();

  // Registro de usuario con email y contraseña
  Future<UserCredential> registerWithEmailAndPassword(
    String email, String password, UserModel userModel) async {
  try {
    // Registrar en Firebase Auth
    final UserCredential userCredential = await _auth.createUserWithEmailAndPassword(
      email: email,
      password: password,
    );

    // Si el registro en Auth fue exitoso, guardar datos adicionales en Firestore
    if (userCredential.user != null) {
      // Obtener el UID del usuario recién creado
      String uid = userCredential.user!.uid;

      // Guardar información adicional del usuario en Firestore usando el UID como id_empleado
      await _userService.addUser(userModel, uid);
    }

    return userCredential;
  } on FirebaseAuthException catch (e) {
     if (e.code == 'email-already-in-use') {
      throw Exception('Ya existe una cuenta con ese correo electrónico.');
    } else {
      throw Exception('Error al registrar usuario: ${e.message}');
    }
  } catch (e) {
    throw Exception('Error al registrar usuario: $e');
  }
}

  // Inicio de sesión con email y contraseña
  Future<UserModel> signInWithEmailAndPassword(String email, String password) async {
  try {
    final UserCredential userCredential = await _auth.signInWithEmailAndPassword(
      email: email,
      password: password,
    );

    // Obtener UID del usuario autenticado
    final String uid = userCredential.user!.uid;

    // Obtener la información del usuario desde Firestore
    final UserModel user = await _userService.getUserById(uid) as UserModel;

    return user;
  } on FirebaseAuthException catch (e) {
    if (e.code == 'user-not-found') {
      throw Exception('No se encontró ningún usuario con ese correo electrónico.');
    } else if (e.code == 'wrong-password') {
      throw Exception('Contraseña incorrecta.');
    } else {
      throw Exception('Error al iniciar sesión: ${e.message}');
    }
  } catch (e) {
    throw Exception('Error al iniciar sesión: $e');
  }
}


  // Cerrar sesión
  Future<void> signOut() async {
    await _auth.signOut();
  }

  // Restablecer contraseña
  Future<void> resetPassword(String email) async {
    try {
      await _auth.sendPasswordResetEmail(email: email);
    } on FirebaseAuthException catch (e) {
      throw Exception('Error al restablecer la contraseña: ${e.message}');
    } catch (e) {
      throw Exception('Error al restablecer la contraseña: $e');
    }
  }

  // Actualizar perfil de usuario (nombre, foto, etc.)
  Future<void> updateUserProfile({String? displayName, String? photoURL}) async {
    try {
      if (_auth.currentUser != null) {
        await _auth.currentUser!.updateDisplayName(displayName);
        await _auth.currentUser!.updatePhotoURL(photoURL);
      } else {
        throw Exception('No hay usuario autenticado');
      }
    } catch (e) {
      throw Exception('Error al actualizar perfil: $e');
    }
  }

  // Cambiar contraseña
  Future<void> changePassword(String currentPassword, String newPassword) async {
    try {
      User? user = _auth.currentUser;
      if (user == null) {
        throw Exception('No hay usuario autenticado');
      }

      // Volver a autenticar al usuario antes de cambiar la contraseña
      AuthCredential credential = EmailAuthProvider.credential(
        email: user.email!,
        password: currentPassword,
      );
      await user.reauthenticateWithCredential(credential);
      
      // Cambiar la contraseña
      await user.updatePassword(newPassword);
    } catch (e) {
      throw Exception('Error al cambiar la contraseña: $e');
    }
  }

  // Eliminar cuenta
  Future<void> deleteAccount(String password) async {
    try {
      User? user = _auth.currentUser;
      if (user == null) {
        throw Exception('No hay usuario autenticado');
      }

      // Volver a autenticar al usuario antes de eliminar la cuenta
      AuthCredential credential = EmailAuthProvider.credential(
        email: user.email!,
        password: password,
      );
      await user.reauthenticateWithCredential(credential);
      
      // Eliminar datos del usuario en Firestore si es necesario
      // Aquí puedes usar el UID del usuario o algún otro identificador
      // await _userService.deleteUser(int.tryParse(user.uid) ?? 0);
      
      // Eliminar la cuenta de autenticación
      await user.delete();
    } catch (e) {
      throw Exception('Error al eliminar la cuenta: $e');
    }
  }
}