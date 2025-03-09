import 'package:casa_grande_app/Models/UserModel.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart' show CircleAvatar, Divider, TextButton;
import '../../../Widgets/action_button.dart';
import '../../../Widgets/stats_card.dart';

class MedicDashboard extends StatelessWidget {
  final UserModel user; // Modelo de usuario con información como nombre y cargo
  
  const MedicDashboard({Key? key, required this.user}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      navigationBar: const CupertinoNavigationBar(
        middle: Text('Panel Médico'),
      ),
      child: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Encabezado con información del usuario
              Row(
                children: [
                  const CircleAvatar(
                    radius: 30,
                    backgroundColor: CupertinoColors.systemBlue,
                    child: Icon(
                      CupertinoIcons.person,
                      color: CupertinoColors.white,
                      size: 36,
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Bienvenido, ${user.nombre}',
                          style: const TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.bold,
                            color: CupertinoColors.systemBlue,
                          ),
                        ),
                        Text(
                          'Cargo: ${user.cargo}',
                          style: const TextStyle(
                            fontSize: 16,
                            color: CupertinoColors.systemGrey,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 20),

              // Acciones estándar para todos los usuarios
              const Text(
                'Acciones Rápidas',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 10),
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: [
                    ActionButton(
                      label: 'Lista de\nPacientes',
                      icon: CupertinoIcons.person_2,
                      onPressed: () => Navigator.pushNamed(context, '/PacienteLista'),
                    ),
                    ActionButton(
                      label: 'Registrar\nAsistencia',
                      icon: CupertinoIcons.checkmark_circle,
                      onPressed: () => Navigator.pushNamed(context, '/registrarAsistencia'),
                    ),
                    ActionButton(
                      label: 'Nueva\nFicha',
                      icon: CupertinoIcons.doc_append,
                      onPressed: () => Navigator.pushNamed(context, '/agregarFichaMedica'),
                    ),
                    ActionButton(
                      label: 'Historial\nMédico',
                      icon: CupertinoIcons.chart_bar,
                      onPressed: () => Navigator.pushNamed(context, '/historialMedico'),
                    ),
                    ActionButton(
                      label: 'Cerrar sesión',
                      icon: CupertinoIcons.calendar,
                      onPressed: () => Navigator.pushNamed(context, '/consultasPendientes'),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 20),

              // Resumen de actividad
              const Text(
                'Resumen de Actividad',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 10),
              Row(
                children: [
                  Expanded(
                    child: StatsCard(
                      title: 'Pacientes Hoy',
                      value: '12',
                      backgroundColor: CupertinoColors.systemBlue.withOpacity(0.1),
                    ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: StatsCard(
                      title: 'Pendientes',
                      value: '5',
                      backgroundColor: CupertinoColors.systemOrange.withOpacity(0.1),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 10),
              Row(
                children: [
                  Expanded(
                    child: StatsCard(
                      title: 'Total Pacientes',
                      value: '87',
                      backgroundColor: CupertinoColors.systemGreen.withOpacity(0.1),
                    ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: StatsCard(
                      title: 'Fichas Nuevas',
                      value: '3',
                      backgroundColor: CupertinoColors.systemPurple.withOpacity(0.1),
                    ),
                  ),
                ],
              ),
              
              const SizedBox(height: 20),
              
              // Próximas consultas
              const Text(
                'Próximas Consultas',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 10),
              Container(
                decoration: BoxDecoration(
                  color: CupertinoColors.systemGrey6,
                  borderRadius: BorderRadius.circular(10),
                ),
                padding: const EdgeInsets.all(12),
                child: Column(
                  children: [
                    _buildAppointmentRow('María González', '10:00', 'Consulta General'),
                    const Divider(),
                    _buildAppointmentRow('Juan Pérez', '11:30', 'Seguimiento'),
                    const Divider(),
                    _buildAppointmentRow('Ana Torres', '14:15', 'Primera visita'),
                    TextButton(
                      onPressed: () => Navigator.pushNamed(context, '/todasConsultas'),
                      child: const Text('Ver todas'),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
  
  Widget _buildAppointmentRow(String nombre, String hora, String tipo) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Row(
        children: [
          const Icon(
            CupertinoIcons.person_crop_circle,
            color: CupertinoColors.systemBlue,
          ),
          const SizedBox(width: 8),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  nombre,
                  style: const TextStyle(fontWeight: FontWeight.bold),
                ),
                Text(
                  tipo,
                  style: const TextStyle(color: CupertinoColors.systemGrey),
                ),
              ],
            ),
          ),
          Text(
            hora,
            style: const TextStyle(
              fontWeight: FontWeight.bold,
              color: CupertinoColors.systemBlue,
            ),
          ),
        ],
      ),
    );
  }
}