import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class NoticesScreen extends StatelessWidget {
  final List<Map<String, String>> notices = [
    {'title': 'Mantenimiento programado', 'description': 'El sistema estará en mantenimiento el próximo sábado de 3 AM a 6 AM.'},
    {'title': 'Nueva política de privacidad', 'description': 'Hemos actualizado nuestra política de privacidad. Por favor, revísala en la configuración.'},
    {'title': 'Bienvenida a nuevos usuarios', 'description': 'Damos la bienvenida a los nuevos usuarios registrados esta semana.'},
  ];

  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      navigationBar: CupertinoNavigationBar(
        middle: Text('Avisos del Administrador'),
      ),
      child: SafeArea(
        child: ListView.builder(
          itemCount: notices.length,
          itemBuilder: (context, index) {
            final notice = notices[index];
            return Padding(
              padding: const EdgeInsets.all(8.0),
              child: CupertinoButton(
                padding: EdgeInsets.zero,
                onPressed: () {
                  showCupertinoDialog(
                    context: context,
                    builder: (context) => CupertinoAlertDialog(
                      title: Text(notice['title']!),
                      content: Text(notice['description']!),
                      actions: [
                        CupertinoDialogAction(
                          child: Text('Cerrar'),
                          onPressed: () => Navigator.of(context).pop(),
                        ),
                      ],
                    ),
                  );
                },
                child: Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          notice['title']!,
                          style: CupertinoTheme.of(context).textTheme.navLargeTitleTextStyle,
                        ),
                        SizedBox(height: 8),
                        Text(
                          notice['description']!,
                          style: CupertinoTheme.of(context).textTheme.textStyle,
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}
