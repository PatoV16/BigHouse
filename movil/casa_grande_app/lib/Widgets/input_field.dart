import 'package:flutter/cupertino.dart';

class InputField extends StatelessWidget {
  final String placeholder;
  final TextEditingController controller;
  final TextInputType keyboardType;

  const InputField({
    Key? key,
    required this.placeholder,
    required this.controller,
    this.keyboardType = TextInputType.text, required String label,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return CupertinoTextField(
      controller: controller,
      keyboardType: keyboardType,
      placeholder: placeholder,
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: CupertinoColors.systemGrey6,
        borderRadius: BorderRadius.circular(10),
      ),
    );
  }
}
