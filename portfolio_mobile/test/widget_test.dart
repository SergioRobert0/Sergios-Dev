import 'package:flutter_test/flutter_test.dart';
import 'package:portfolio_mobile/main.dart';

void main() {
  testWidgets('mostra a apresentação do portfólio', (tester) async {
    await tester.pumpWidget(const PortfolioApp());

    expect(find.text('Sérgio Roberto\nLoyola'), findsOneWidget);
    expect(find.text('Suporte, Helpdesk e Programador'), findsOneWidget);
  });
}
