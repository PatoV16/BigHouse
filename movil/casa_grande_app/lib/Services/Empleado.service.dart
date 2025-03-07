import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:casa_grande_app/Models/Empleado.model.dart';

class EmpleadoService {
  final CollectionReference empleadosRef =
      FirebaseFirestore.instance.collection('empleados');

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
}