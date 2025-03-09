import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:casa_grande_app/Models/Empleado.model.dart';

class EmpleadoService {
  final CollectionReference empleadosRef =
      FirebaseFirestore.instance.collection('empleados');
  final FirebaseAuth _auth = FirebaseAuth.instance;

  // Guardar un empleado en Firestore
  Future<String> addEmpleado(Empleado empleado) async {
    try {
      DocumentReference docRef = await empleadosRef.add(empleado.toMap());
      return docRef.id; // Devuelve el ID del documento creado
    } catch (e) {
      throw Exception('Error al agregar empleado: $e');
    }
  }

  // Obtener todos los empleados
  Stream<List<Empleado>> getEmpleados() {
    return empleadosRef.snapshots().map((snapshot) {
      return snapshot.docs.map((doc) {
        return Empleado.fromMap(doc.data() as Map<String, dynamic>, doc.id);
      }).toList();
    });
  }

  // Actualizar un empleado
  Future<void> updateEmpleado(Empleado empleado) async {
    try {
      await empleadosRef.doc(empleado.id).update(empleado.toMap());
    } catch (e) {
      throw Exception('Error al actualizar empleado: $e');
    }
  }

  // Eliminar un empleado
  Future<void> deleteEmpleado(String id) async {
    try {
      await empleadosRef.doc(id).delete();
    } catch (e) {
      throw Exception('Error al eliminar empleado: $e');
    }
  }

  // Obtener el empleado por UID del usuario autenticado
  Future<Empleado?> obtenerEmpleadoPorUid() async {
    try {
      User? user = _auth.currentUser; // Obtener usuario autenticado
      if (user == null) return null; // Si no hay usuario, retorna null

      QuerySnapshot querySnapshot = await empleadosRef
          .where('uid', isEqualTo: user.uid)
          .limit(1)
          .get();

      if (querySnapshot.docs.isNotEmpty) {
        var doc = querySnapshot.docs.first;
        return Empleado.fromMap(doc.data() as Map<String, dynamic>, doc.id);
      }
      return null; // Si no encuentra el empleado
    } catch (e) {
      throw Exception('Error al obtener empleado por UID: $e');
    }
  }
  
}
