import 'package:flutter/cupertino.dart';
import 'RegistroNovedad.dart';
import 'NoticesScreen.dart';

class NurseDashboard extends StatelessWidget {
  const NurseDashboard({super.key});

  void _handleAddNote(BuildContext context) {
    Navigator.push(
      context,
      CupertinoPageRoute(
        builder: (context) => const RegistroNovedadForm(),
      ),
    );
  }

  void _handleNotifications(BuildContext context) {
    Navigator.push(
      context,
      CupertinoPageRoute(
        builder: (context) => NoticesScreen(),
      ),
    );
  }

  void _handleAttendance() {
    // Lógica para registrar asistencia
  }

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      navigationBar: const CupertinoNavigationBar(
        middle: Text('Dashboard de Enfermería'),
      ),
      child: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Encabezado
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(16.0),
                decoration: BoxDecoration(
                  color: CupertinoColors.white,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(
                    color: CupertinoColors.systemGrey5,
                    width: 1,
                  ),
                ),
                child: Row(
                  children: [
                    const Icon(
                      CupertinoIcons.person_circle_fill,
                      size: 32,
                      color: CupertinoColors.activeBlue,
                    ),
                    const SizedBox(width: 12),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: const [
                        Text(
                          '¡Bienvenido/a!',
                          style: TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.bold,
                            color: CupertinoColors.systemOrange,
                          ),
                        ),
                        Text(
                          'Panel de Control',
                          style: TextStyle(
                            fontSize: 18,
                            color: CupertinoColors.systemGrey,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 32),

              // Opciones
              Wrap(
                spacing: 20,
                runSpacing: 20,
                children: [
                  // Agregar Novedad
                  _buildOptionButton(
                    title: 'Agregar\nNovedad',
                    icon: CupertinoIcons.plus_circle,
                    color: CupertinoColors.systemGreen,
                    onTap: () => _handleAddNote(context),
                  ),

                  // Avisos
                  _buildOptionButton(
                    title: 'Avisos',
                    icon: CupertinoIcons.bell,
                    color: CupertinoColors.systemBlue,
                    onTap: () => _handleNotifications(context), // Corrección aquí
                  ),

                  // Asistencia
                  _buildOptionButton(
                    title: 'Asistencia',
                    icon: CupertinoIcons.calendar_badge_plus,
                    color: CupertinoColors.systemOrange,
                    onTap: _handleAttendance,
                  ),

                  //Cerrar Sesión
                  _buildOptionButton(
                    title: 'Cerrar Sesión',
                    icon: CupertinoIcons.arrow_right,
                    color: const Color.fromARGB(255, 240, 6, 6),
                    onTap: _handleAttendance,
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildOptionButton({
    required String title,
    required IconData icon,
    required Color color,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 150,
        height: 120,
        decoration: BoxDecoration(
          color: color.withOpacity(0.1),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              icon,
              size: 32,
              color: color,
            ),
            const SizedBox(height: 8),
            Text(
              title,
              textAlign: TextAlign.center,
              style: TextStyle(
                color: color,
                fontSize: 16,
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
