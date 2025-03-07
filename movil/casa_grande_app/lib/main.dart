import 'package:casa_grande_app/Models/UserModel.dart';
import 'package:casa_grande_app/Pages/admin/screen/ReferenciaDetalleScreen.dart';
import 'package:casa_grande_app/Pages/admin/form/actaCompromiso.page.dart';
import 'package:casa_grande_app/Pages/admin/screen/adminDashboard.page.dart';
import 'package:casa_grande_app/Pages/admin/screen/asistencia.page.dart';
import 'package:casa_grande_app/Pages/admin/screen/empleadoList.page.dart';
import 'package:casa_grande_app/Pages/admin/form/empleado_form.dart';
import 'package:casa_grande_app/Pages/admin/screen/listReferencia.dart';
import 'package:casa_grande_app/Pages/admin/screen/listaActas.dart';
import 'package:casa_grande_app/Pages/admin/form/paciente_form.dart';
import 'package:casa_grande_app/Pages/admin/screen/verActaCompromiso.dart';
import 'package:casa_grande_app/Widgets/Login_Screen.dart';
import 'package:casa_grande_app/Widgets/User_Dashboard_Screen.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'Pages/admin/screen/actasCompromisoScreen.dart';
import 'firebase_options.dart'; // Asegúrate de importar el archivo generado
import 'package:provider/provider.dart';
import 'package:casa_grande_app/Services/ActaCompromiso.service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Inicializa Firebase con los options generados en firebase_options.dart
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        Provider<ActaCompromisoService>(
          create: (_) => ActaCompromisoService(),
        ),
        // Otros providers que necesites
      ],
      child: MaterialApp(
        title: 'Casa Grande',
        theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
          useMaterial3: true,
        ),
        // Definimos las rutas de la aplicación
        initialRoute: '/login', // Ruta inicial
        routes: {
          '/login': (context) => LoginScreen(), // Pantalla de login
          '/admin': (context) => AdminDashboard(),
          '/registrarPaciente': (context) => const PacienteForm(),
          '/registrarEmpleado': (context) => const EmpleadoForm(),
          '/registrarActaCompromiso': (context) => const ActaCompromisoForm(),
          '/empleadosList': (context) => const EmpleadoListScreen(),
          '/registrarAsistenciaPaciente': (context) => const AsistenciaListScreen(),
          '/referenciaLista': (context) => const ReferenciaListScreen(),
          '/listaActasCompromiso': (context) => const ActaCompromisoListScreen(),
          '/cartaCompomiso': (context) =>  CartaCompromisoScreen(),
          '/verActaCompromiso': (context) {
                                      final args = ModalRoute.of(context)!.settings.arguments as String;
                                      return ActaCompromisoDisplay(idPaciente: args);
                                    },
          '/detalleRefeencia': (context){
                                      final args = ModalRoute.of(context)!.settings.arguments as String;
                                      return ReferenciaDetalleScreen(idPaciente: args);
                                    },
          '/dashboardUser': (context){
                                      final args = ModalRoute.of(context)!.settings.arguments as UserModel;
                                      return UserDashboard(user: args);
          },
          // Aquí puedes agregar más rutas para otros dashboards
        },
      ),
    );
  }
}